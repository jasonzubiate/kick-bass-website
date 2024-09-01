"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ICoachFields } from "@/lib/contentful/contentful";
import CoachCard from "../ui/CoachCard";

export default function CoachesCarousel({
  coaches,
}: {
  coaches: ICoachFields[];
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, startDelay: 0 }),
  ]);

  return (
    <div className="embla mb-12 lg:mb-24">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {coaches.map((coach, index) => (
            <li
              className={`${index % 2 === 1 ? "mt-[10vw] lg:mt-[4vw]" : ""}`}
              key={coach.title}
            >
              <div className="mr-[4vw] lg:mr-[1.5vw] min-h-[300px] min-w-[220px] h-[24vw] lg:w-[20vw] 2xl:w-[18vw]">
                <CoachCard
                  name={coach.title}
                  image={coach.image}
                  type={coach.category}
                  slug={coach.slug}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
