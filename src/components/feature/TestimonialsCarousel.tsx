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
    <div className="relative mb-12 lg:mb-24">
      <div ref={emblaRef}>
        <ul className="flex pl-4 lg:pl-6 2xl:pl-[4vw] cursor-grab">
          {testimonials.map((review, index) => (
            <li
              className={`${index % 2 === 1 ? "mt-[10vw] lg:mt-[4vw]" : ""}`}
              key={index}
            >
              <div className="mr-[4vw] lg:mr-[1.5vw] min-h-[400px] h-[24vw] w-[250px] xl:w-[22vw] 2xl:w-[18vw]">
                <TesitmonialCard testimonial={review} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
