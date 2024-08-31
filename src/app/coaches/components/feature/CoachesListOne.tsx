"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useRef } from "react";
import CoachCard from "../ui/CoachCard";
import { Coach } from "@/lib/contentful/types";

export default function CoachesListOne({ coaches }: { coaches: Coach[] }) {
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);

    CustomEase.create("easy", "0.83, 0, 0.17, 1");

    cardRefs.current.forEach((ref) => {
      gsap.to(ref, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scale: 1,
        ease: "easy",
        scrollTrigger: {
          trigger: ref,
          start: "top bottom",
          end: "bottom 20%",
        },
      });
    });
  }, []);

  return (
    <ul className="flex md:hidden flex-col gap-5">
      {coaches.map(({ title, category, image, slug }, index) => (
        <li
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          key={title}
          className="w-full h-[600px] opacity-0 scale-95 translate-y-10"
        >
          <CoachCard title={title} category={category} image={image} slug={slug} />
        </li>
      ))}
    </ul>
  );
}
