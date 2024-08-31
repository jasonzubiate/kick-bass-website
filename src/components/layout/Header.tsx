"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Navbar from "./Navbar";
import MenuButton from "../button/MenuButton";
import MenuModal from "../modal/MenuModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
  const icon = useRef(null);
  const cta = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useGSAP(() => {
    let lastScrollTop = 0;
    const iconEl = icon.current;
    const ctaEl = cta.current;

    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        const currentScrollTop = self.scroll();
        if (currentScrollTop > lastScrollTop) {
          gsap.to([iconEl, ctaEl], { y: -110, duration: 0.8 });
        } else {
          gsap.to([iconEl, ctaEl], { y: 0, duration: 0.8 });
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
      },
    });
  }, []);

  return (
    <header>
      <Link
        ref={icon}
        href="/"
        className="fixed top-10 left-4 lg:left-8 2xl:left-12 z-40 mix-blend-difference w-[clamp(120px,8vw,144px]) h-[clamp(44px,3vw,54px)]"
      >
        <Image
          src="/icons/kick-bass-logo-white.png"
          alt="Kick & Bass"
          objectFit="contain"
          priority
          fill
        />
      </Link>

      <Navbar pathname={pathname} />

      <div
        ref={cta}
        className="fixed hidden xl:flex right-4 lg:right-8 2xl:right-12 top-10 z-50 mix-blend-difference"
      >
        <a
          href="https://www.launchpass.com/k-and-b-tech-house/k-and-b-premium/v3"
          target="_blank"
          rel="noopener noreferrer"
          className="fluid-text--sm px-4 py-2 rounded-full border-2 border-neutral-50 hover:bg-neutral-50 hover:text-codGray transition-colors duration-300"
        >
          Join Kick & Bass
        </a>
      </div>

      <div className="fixed top-10 right-4 flex items-center gap-2 z-50">
        <MenuButton isActive={isMenuOpen} setIsActive={setIsMenuOpen} />
        <MenuModal
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          pathname={pathname}
        />
      </div>
    </header>
  );
}
