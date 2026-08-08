import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { meta, siteUrl } from "@/content/en/meta";
import { getEducation, getProfile, getSkills } from "@/lib/data/portfolio";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/utils/json-ld";
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

// T026 — research.md R-007. `metadataBase` makes the relative `/og.png` and
// canonical `/` resolve to absolute URLs; without it Next emits a relative
// og:image, which most crawlers drop.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  // Explicit, not inferred: Cloudflare in front of Vercel can serve the same
  // build on two hostnames, and both would otherwise index (R-007).
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: meta.title,
    title: meta.title,
    description: meta.description,
    locale: meta.locale,
    images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Same rows page.tsx reads. Next dedupes the fetches within a render, and
  // `safeQuery` never throws — an unreachable DB degrades JSON-LD to the
  // content-layer values instead of failing the layout.
  const [profile, skills, education] = await Promise.all([
    getProfile(),
    getSkills(),
    getEducation(),
  ]);
  const jsonLd = serializeJsonLd(
    buildPersonJsonLd({ profile, skills, education, siteUrl })
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
        {/* Safe because serializeJsonLd escapes `<` — see json-ld.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
