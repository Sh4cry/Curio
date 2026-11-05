import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curio — a learning path that follows your curiosity",
  description: "A personal AI tutor for learning with sources, small steps, and useful practice.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
