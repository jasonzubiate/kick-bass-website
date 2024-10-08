"use client";
import gsap from "gsap";
import { TbArrowUpRight } from "react-icons/tb";
import Image from "next/image";
import { useRef } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  color: string;
  sticker: string;
  details?: string[];
  video?: string;
};

export default function ServiceCard({
  title,
  description,
  color,
  sticker,
  details,
  video,
}: ServiceCardProps) {
  const cardRef = useRef(null);
  const detailsRef = useRef(null);

  const onHover = () => {
    gsap.killTweensOf([cardRef.current, detailsRef.current]);

    gsap.to(cardRef.current, {
      backgroundColor: color,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(detailsRef.current, {
      opacity: 1,
      duration: 0.4,
      delay: 0.3,
      ease: "power2.out",
    });
  };

  const onHoverOut = () => {
    gsap.killTweensOf([cardRef.current, detailsRef.current]);

    gsap.to(cardRef.current, {
      backgroundColor: "#171717",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(detailsRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      className="service-card w-full h-[320px] lg:h-[360px] 2xl:h-[500px] flex items-end rounded-2xl p-3 2xl:p-4 bg-neutral-900 relative"
    >
      <div className="service-card__image absolute top-[35%] 2xl:top-[40%] left-1/2 -translate-x-1/2 -translate-y-[40%] h-[128px] w-[128px] lg:h-[144px] lg:w-[144px] 2xl:h-[164px] 2xl:w-[164px] rotate-6 transition-all duration-500">
        <Image
          src={`https:${sticker}`}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      <div className="service-card__content flex flex-col justify-between w-full bg-neutral-950 p-4 lg:p-6 2xl:p-8 rounded-xl z-10 h-16 lg:h-20 2xl:h-[100px] overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex justify-between items-start">
          <h3 className="service-card__title text-2xl lg:text-3xl 2xl:text-4xl whitespace-nowrap text-white polysans-neutral transition-all duration-500 ease-in-out">
            {title}
          </h3>

          <TbArrowUpRight className="service-card__icon w-6 h-6 lg:w-8 lg:h-8  text-neutral-400 transition-all duration-500 ease-in-out" />
        </div>

        {video ? (
          <div
            ref={detailsRef}
            className="flex flex-col gap-4 opacity-0 transtion-all"
          >
            <video
              src={video}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-[150px] lg:h-[175px] 2xl:h-[250px] rounded-md 2xl:rounded-lg object-cover object-center"
            />

            <p className="text-sm lg:text-base 2xl:text-lg text-white transition-all duration-300 leading-tight">
              {description}
            </p>
          </div>
        ) : (
          <div
            ref={detailsRef}
            className="flex flex-col gap-4 lg:gap-6 2xl:gap-8 opacity-0 transtion-all"
          >
            <p className="text-xl lg:text-2xl 2xl:text-3xl text-white transition-all duration-300 leading-none">
              {description}
            </p>

            <div className="flex">
              <ul className="flex flex-col gap-1 w-1/2">
                {details
                  ?.slice(0, Math.ceil(details.length / 2))
                  .map((detail, index) => (
                    <li
                      key={index}
                      className="offbit-101-bold uppercase text-neutral-400 text-xs lg:text-sm 2xl:text-base"
                    >
                      {detail}
                    </li>
                  ))}
              </ul>
              <ul className="flex flex-col gap-1 w-1/2">
                {details
                  ?.slice(Math.ceil(details.length / 2))
                  .map((detail, index) => (
                    <li
                      key={index + Math.ceil(details.length / 2)}
                      className="offbit-101-bold uppercase text-neutral-400 text-xs lg:text-sm 2xl:text-base"
                    >
                      {detail}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
