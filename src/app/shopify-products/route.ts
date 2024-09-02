import { client } from "@/lib/contentful/client";
import {
  IShopifyCollection,
  IShopifyCollectionFields,
} from "@/lib/contentful/contentful";

type ShopifyImage = {
  node: {
    src: string;
    altText: string | null;
  };
};

type ShopifyProduct = {
  node: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: ShopifyImage[];
    };
  };
};

export const GET = async () => {
  const shopifyData = (await client.getEntry(
    "7vWIgUybcQO7cyApKyBfpq"
  )) as IShopifyCollection;

  const shopify = shopifyData.fields as IShopifyCollectionFields;

  if (!shopify?.shopId || !shopify?.apiVersion || !shopify.accessToken) {
    return new Response(JSON.stringify({ err: "No credentials" }), {
      status: 400,
    });
  }

  const url = `https://${shopify.shopId}.myshopify.com/api/${shopify.apiVersion}/graphql.json`;
  const collection = shopify.collectionName
    ? shopify.collectionName
    : "all-packs";

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": shopify.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          shop {
            primaryDomain {
              url
            }
          }
          collection(handle: "${collection}") {
            products(first: 250, sortKey: TITLE, reverse: true) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        src
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    const { data, errors } = await result.json();

    if (errors) {
      console.error(errors);
      return new Response(JSON.stringify({ error: "GraphQL query error" }), {
        status: 500,
      });
    }

    if (!data.collection) {
      return new Response(JSON.stringify({ error: "Collection not found" }), {
        status: 404,
      });
    }

    const edges = data.collection.products.edges;
    const domain = data.shop.primaryDomain.url;

    const products = edges.map((edge: { node: ShopifyProduct["node"] }) => {
      const node = edge.node;
      const imageEdge = node.images.edges[0];

      return {
        name: node.title,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        image: imageEdge ? imageEdge.node.src : "",
        url: `${domain}/products/${node.handle}`,
      };
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Something went wrong when fetching from Shopify",
      }),
      { status: 500 }
    );
  }
};
