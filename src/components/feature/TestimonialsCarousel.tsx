"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ITestimonialFields } from "@/lib/contentful/contentful";
import TesitmonialCard from "../ui/TestimonialCard";

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: ITestimonialFields[];
}) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="embla">
      <div ref={emblaRef} className="overflow-hidden pl-4 lg:pl-8 2xl:pl-12">
        <ul className="flex cursor-grab">
          {testimonials.map((review, index) => (
            <li
              className={`${index % 2 === 1 ? "mt-[10vw] lg:mt-[4vw]" : ""} mr-[3vw] xl:mr-[1.5vw]`}
              key={index}
            >
              <TesitmonialCard testimonial={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
