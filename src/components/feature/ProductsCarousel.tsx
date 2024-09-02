"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../ui/ProductCard";

type Product = {
  name: string;
  price: number;
  image: string;
  url: string;
};

export default function ProductsCarousel({
  products,
}: {
  products: Product[];
}) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="embla pl-4 lg:pl-8 2xl:pl-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {products.map((product) => (
            <li className="mr-[3vw] xl:mr-[1.5vw]" key={product.name}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
