"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import CoachCard from "../ui/CoachCard";
import { ICoachFields } from "@/lib/contentful/contentful";

export default function CoachesListTwoColumns({ coaches }: { coaches: ICoachFields[] }) {
  const evenColumnsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const columns: any[][] = [[], []];
  coaches.forEach((coach, index) => {
    columns[index % 2].push(coach);
  });

  useEffect(() => {
    const handleScroll = () => {
      evenColumnsRefs.current.forEach((ref) => {
        if (ref) {
          const speed = 0.08;
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
    <div className="hidden md:grid md:grid-cols-2 gap-[2vw] xl:hidden">
      {columns.map((column, columnIndex) => (
        <motion.div
          key={columnIndex}
          ref={(el) => {
            if (columnIndex % 2 === 0) {
              evenColumnsRefs.current[columnIndex] = el;
            }
          }}
          className={`column ${columnIndex % 2 !== 1 ? "mt-28" : ""}`}
        >
          {column.map(({ title, category, image, slug }) => (
            <div key={title} className="mt-[2vw] h-[54vw]">
              <CoachCard
                title={title}
                category={category}
                image={image}
                slug={slug || null}
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
