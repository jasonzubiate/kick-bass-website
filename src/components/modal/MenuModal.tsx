"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const modalVariants = {
  open: {
    width: 260,
    height: "auto",
    borderRadius: "16px",
  },
  closed: {
    width: 48,
    height: 48,
    borderRadius: "28px",
  },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/coaches", label: "Coaches" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/pricing", label: "Pricing" },
  { href: "https://kick-bass.store/", label: "Shop", isExternal: true },
];

type MenuModalProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  pathname: string;
};

export default function MenuModal({
  isMenuOpen,
  setIsMenuOpen,
  pathname,
}: MenuModalProps) {
  return (
    <motion.div
      className="menu-modal"
      variants={modalVariants}
      animate={isMenuOpen ? "open" : "closed"}
      initial="closed"
      transition={{ duration: 0.6, ease: cubicBezier(0.83, 0, 0.17, 1) }}
    >
      <div className="p-8">
        <p
          className={`${
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          } menu-modal__header`}
        >
          Menu
        </p>

        <nav>
          {links.map(({ href, label, isExternal }, index) => (
            <>
              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className={`${
                    isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                >
                  <p className="text-neutral-950">{label}</p>
                  <div className="opacity-0 indicator" />
                </a>
              ) : (
                <Link
                  href={href}
                  className={`${
                    isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  key={index}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <p
                    className={`${
                      pathname === href
                        ? "text-neutral-400"
                        : "text-neutral-950"
                    }`}
                  >
                    {label}
                  </p>
                  <div
                    className={`${
                      pathname === href ? "opacity-100" : "opacity-0"
                    } indicator`}
                  />
                </Link>
              )}
            </>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
