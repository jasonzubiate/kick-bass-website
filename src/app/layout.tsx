import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/layout/Header";
import LenisContext from "@/contexts/LenisContext";
import { metadata } from "../../metadata";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">
        <LenisContext>
          <Header />
          {children}
        </LenisContext>
      </body>
    </html>
  );
}
