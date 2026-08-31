import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Kansakar — AI, Automation & Creative Technology",
  description: "The digital portfolio of Dev Kansakar: AI, automation, APIs, and useful web systems.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Dev Kansakar — AI, Automation & Creative Technology",
    description: "A digital portfolio for AI, automation, APIs, and useful web systems.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#101729", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
