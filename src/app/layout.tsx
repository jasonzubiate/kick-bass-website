import LenisContext from "@/contexts/LenisContext";
import { metadata } from "../../metadata";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/globals.scss";

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
          <Footer />
        </LenisContext>
      </body>
    </html>
  );
}
