import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { meta } from "@/content/en/meta";
import "../styles/globals.css";

// Body/UI. The Vietnamese subset is required — the owner's name ("Trần Đăng
// Mạnh") renders in this face, not the display face (see below). It is
// requested by omitting `subsets` rather than naming it: Google serves Geist
// with a `vietnamese` subset, but next/font's bundled types predate it and
// reject the literal. Omitting the option pulls every subset the family has,
// and per-glyph unicode-range splitting means the browser only downloads the
// files a page actually uses — so this costs nothing at runtime.
// TODO: pin back to `subsets: ["latin", "vietnamese"]` once next/font's
// generated types include it.
const geistSans = Geist({
  variable: "--font-sans-face",
  display: "swap",
});

// Mono — status tags, data values, code-adjacent labels (Typography.md).
const geistMono = Geist_Mono({
  variable: "--font-mono-face",
  display: "swap",
});

// Display/accent (OFL). Latin-only by design: Orbitron has no Vietnamese
// diacritics (missing ă Đ ạ ầ). Restrict it to ASCII strings — section
// indices (`01 / 06`), status tags (`[TEAM PROJECT]`), Hero headline.
// Never apply `font-display` to the name or any Vietnamese copy.
const orbitron = Orbitron({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

// Minimal wiring only. Canonical URL, OG tags and the JSON-LD Person block
// are T026 (research.md R-007); the strings already live in content/en/meta.ts.
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
