import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kick & Bass | Level Up Your Music Production",
  description:
    "We can help you with music production and Career Growth. We are a friendly and talented team. Join today!",
  keywords: [
    "Tech House",
    "EDM Production",
    "Music Production",
    "Kick & Bass",
    "Community",
    "Coaches",
    "Tutorials",
  ],
  authors: [{ name: "Frederik Trier" }],
  creator: "Kick & Bass",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kick-bass.com/m",
    siteName: "Kick & Bass",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kick & Bass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kickbassofficial",
    creator: "@kickbassofficial",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL("https://www.kick-bass.com/m"),
};
