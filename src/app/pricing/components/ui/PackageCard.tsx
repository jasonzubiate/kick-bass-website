"use client";
import { useState } from "react";

type PackageCardProps = {
  title: string;
  price: number;
  description: string | null | undefined;
  link: string | null | undefined;
  extras: string | null | undefined;
  color: string | null | undefined;
};

export default function PackageCard({
  title,
  price,
  description,
  link,
  extras,
  color,
}: PackageCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const features = extras?.trim().split("\n");

  return (
    <div
      className="flex flex-col p-6 2xl:p-8 rounded-xl lg:rounded-2xl 2xl:rounded-3xl border-2 h-auto lg:h-full relative transition-all duration-200"
      style={{
        borderColor: color as string,
        boxShadow: isCardHovered ? `0 0 15px ${color}` : "none",
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-3 2xl:gap-5">
          <h3
            className="text-[clamp(20px,1.6vw,28px)] mb-2 lg:mb-3"
            style={{ color: color as string }}
          >
            K&B {title}
          </h3>

          <div className="flex items-end">
            <h4
              className="text-[clamp(54px,3.5vw,72px)] leading-[0.8] tracking-tight polysans-median mr-1 lg:mr-2 2xl:mr-3"
              style={{ color: color as string }}
            >
              ${price}
            </h4>
            <p
              className="text-[clamp(12px,0.9vw,16px)] uppercase"
              style={{ color: color as string }}
            >
              / month
            </p>
          </div>
        </div>

        <p className="text-neutral-400 mb-4 lg:mb-0 h-16 lg:h-[9vw] xl:h-[7vw] 2xl:h-[120px] text-[clamp(16px,1vw,20px)] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <a
          href={
            link ||
            "https://www.launchpass.com/k-and-b-tech-house/k-and-b-tech-house/v3"
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`py-2 lg:py-3 w-full text-center rounded-full  fluid-text--base polysans-median border-2 transition-colors duration-300 hover:text-neutral-500 hover:bg-[${color}]`}
          style={{
            borderColor: color as string,
            color: isHovered ? "#131313" : "inherit",
            backgroundColor: isHovered ? (color as string) : "transparent",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Join Kick & Bass
        </a>

        <ul className="flex flex-col gap-1 lg:gap-2 m-0">
          {features?.map((feature, index) => (
            <li
              key={index}
              className="text-[clamp(16px,1vw,20px)] text-neutral-400"
            >
              <span style={{ color: color as string }} className="mr-2">
                •
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
