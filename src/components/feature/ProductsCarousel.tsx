"use client";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../ui/ProductCard";
import { useCallback } from "react";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div>
      <div className="embla">
        <div ref={emblaRef} className="overflow-hidden pl-4 lg:pl-8 2xl:pl-12">
          <ul className="flex">
            {products.map((product) => (
              <li className="mr-[3vw] xl:mr-[1.5vw]" key={product.name}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="padding-container flex gap-4 justify-end w-full mt-8 xl:mt-12">
        <button
          className="rounded-full border-2 border-neutral-50 p-2 md:p-2.5 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-300"
          onClick={scrollPrev}
        >
          <TbArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <button
          className="rounded-full border-2 border-neutral-50 p-2 md:p-2.5 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-300"
          onClick={scrollNext}
        >
          <TbArrowRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
}
