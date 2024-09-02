import ProductsCarousel from "./ProductsCarousel";

type Product = {
  name: string;
  price: number;
  image: string;
  url: string;
};

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const publicUrl = vercelUrl
  ? "https://" + vercelUrl
  : process.env.PAYLOAD_PUBLIC_APP_URL;

export default async function ProductsList() {
  let products: Product[] = [];

  try {
    const response = await fetch(`${publicUrl}/shopify-products`);

    if (response.ok) {
      products = (await response.json()) as Product[];
    }
  } catch (err) {
    console.warn("could not fetch shopify products", err);
  }

  return <ProductsCarousel products={products} />;
}
