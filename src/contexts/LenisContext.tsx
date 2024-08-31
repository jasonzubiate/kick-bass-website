"use client";

import { ReactLenis } from "lenis/react";

export default function LenisContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}
