import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Kansakar — AI, Automation & Creative Technology",
  description:
    "The digital sketchbook portfolio of Dev Kansakar: AI, automation, APIs, and human-friendly web systems.",
  metadataBase: new URL("https://www.youtube.com/@Dev_kansakar"),
  openGraph: {
    title: "Dev Kansakar — AI, Automation & Creative Technology",
    description:
      "A hand-drawn digital portfolio for AI, automation, APIs, and useful web systems.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Kalam:wght@400;700&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

