import HotjarScript from "@/lib/hotjar/HotjarScript";
import { Analytics } from "@vercel/analytics/react";
import LenisContext from "@/contexts/LenisContext";
import { metadata } from "../../metadata";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../styles/globals.scss";
import PreLoader from "@/components/layout/PreLoader";
import CursorDot from "@/components/ui/CursorDot";
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/ui/Toast";

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
          <PreLoader />
          <Header />
          <CursorDot />
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
          <Footer />
          <Analytics />
          <HotjarScript />
        </LenisContext>
      </body>
    </html>
  );
}
