"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CoachCard from "../ui/CoachCard";
import { Coach } from "@/lib/contentful/types";

export default function CoachesListFourColumns({
  coaches,
}: {
  coaches: Coach[];
}) {
  const evenColumnsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const columns: any[][] = [[], [], [], []];
  coaches.forEach((coach, index) => {
    columns[index % 4].push(coach);
  });

  useEffect(() => {
    const handleScroll = () => {
      evenColumnsRefs.current.forEach((ref) => {
        if (ref) {
          const speed = 0.1;
          const offset = window.scrollY * speed;
          ref.style.transform = `translateY(-${offset}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="hidden xl:grid grid-cols-4 gap-[1vw]">
      {columns.map((column, columnIndex) => (
        <motion.div
          key={columnIndex}
          ref={(el) => {
            if (columnIndex % 2 === 0 && el) {
              evenColumnsRefs.current[columnIndex] = el as HTMLDivElement;
            }
          }}
          className={`column ${columnIndex % 2 !== 1 ? "mt-[5vw]" : ""}`}
        >
          {column.map(({ title, category, image, slug }) => (
            <div key={title} className="mt-[1vw] h-[28vw] max-h-[550px]">
              <CoachCard
                title={title}
                category={category}
                image={image}
                slug={slug}
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
