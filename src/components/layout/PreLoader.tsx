"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Image from "next/image";
import CustomEase from "gsap/CustomEase";

export default function PreLoader() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(CustomEase);

    CustomEase.create("easy", "0.83, 0, 0.17, 1");

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1;
        if (nextProgress === 100) {
          clearInterval(interval);
          const tl = gsap.timeline({ defaults: { ease: "easy" } });
          tl.to(ref.current, {
            yPercent: -100,
            duration: 0.8,
            delay: 0.4,
          }).to(
            ref2.current,
            {
              opacity: 0,
              duration: 0.6,
            },
            "<"
          );
        }
        return nextProgress;
      });
    }, 8);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div ref={ref} className="preloader">
      <div ref={ref2} className="preloader__content">
        <div className="preloader__image relative">
          <Image src="/icons/kick-bass-logo-black.png" alt="Kick & Bass" fill />
        </div>

        <div className="flex w-full justify-between">
          <p className="preloader__status-text">Loading</p>
          <p className="preloader__status-text">[{progress}%]</p>
        </div>
      </div>
    </div>
  );
}
