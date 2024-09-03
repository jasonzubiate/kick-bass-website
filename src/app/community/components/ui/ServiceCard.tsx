"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
  color: string;
  index: number;
  image: string;
};

export default function ServiceCard({
  title,
  description,
  features,
  color,
  index,
  image,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cardElement = cardRef.current;
    const contentElement = contentRef.current;
    const detailsElement = detailsRef.current;

    if (!cardElement || !contentElement || !detailsRef) return;

    const onHover = () => {
      cardElement.style.backgroundColor = color;
      gsap.to(contentElement, {
        height: "100%",
        duration: 0.3,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      gsap.to(detailsElement, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    const onHoverOut = () => {
      cardElement.style.backgroundColor = "#131313";
      gsap.to(detailsElement, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
      gsap.to(contentElement, {
        height: "15%",
        duration: 0.3,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    cardElement.addEventListener("mouseenter", onHover);
    cardElement.addEventListener("mouseleave", onHoverOut);

    return () => {
      cardElement.removeEventListener("mouseenter", onHover);
      cardElement.removeEventListener("mouseleave", onHoverOut);
    };
  }, [color]);

  const chunkFeatures = (features: string[], size: number) => {
    const chunks = [];
    for (let i = 0; i < features.length; i += size) {
      chunks.push(features.slice(i, i + size));
    }
    return chunks;
  };

  const featureChunks = chunkFeatures(features, 5);

  return (
    <div
      ref={cardRef}
      className="service__card w-full h-full flex items-end rounded-2xl lg:rounded-[20px] p-3 2xl:p-4 bg-neutral-950 transition-colors duration-500 relative"
    >
      <div className="service__card__image absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[40%] h-[30%] w-full transition-all duration-500">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col justify-between w-full bg-neutral-50 text-neutral-950 p-4 2xl:p-6 rounded-xl overflow-hidden z-10 h-[17%] lg:h-[15%]"
      >
        <div className="flex justify-between">
          <h3 className="text-3xl md:text-2xl 2xl:text-[clamp(24px,1.8vw,48px)] transition-all duration-300 whitespace-nowrap">
            {title}
          </h3>
          <p className="text-xs md:text-sm 2xl:text-base text-neutral-500 offbit-101-bold whitespace-nowrap">{`[ ${
            index + 1
          }/4 ]`}</p>
        </div>
        <div ref={detailsRef} className="flex flex-col gap-12 h-0 opacity-0">
          <p className="text-base 2xl:text-lg text-neutral-950 transition-all duration-300 leading-snug">
            {description}
          </p>
          <ul className="flex">
            {featureChunks.map((chunk, index) => (
              <div key={index} className="flex flex-col gap-0.5 w-1/2">
                {chunk.map((feature, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-xs lg:text-sm list-none text-neutral-500 polysans-neutral-mono tracking-tight pr-4"
                  >
                    {feature}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
