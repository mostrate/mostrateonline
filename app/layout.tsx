import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/config";
import "./globals.css";

// Todas las fuentes se sirven desde app/fonts/ (woff2 de Google Fonts, subset
// latin) en vez de next/font/google: Google a veces responde con URLs sin
// extensión y el loader de next/font/google rompe el build de forma
// intermitente (ver DOCS.md, sección 2). Cada entrada de `src` replica una
// cara del CSS de Google: mismos pesos y estilos, aunque el archivo sea variable.

const syne = localFont({
  src: [
    { path: "./fonts/syne-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/syne-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/syne-latin.woff2", weight: "700", style: "normal" },
    { path: "./fonts/syne-latin.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-syne",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Serif itálica de acento de la landing (palabras destacadas en títulos).
const instrument = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-italic-400.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Fuentes de título alternativas para el selector de tipografías de los
// templates de clientes (ver components/templates/font.ts).
const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

// Fuentes del template Profesional (sus 3 diseños): serif editorial,
// sans de texto y mono para los rótulos del diseño "Técnico".
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/newsreader-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/newsreader-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const jakarta = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/plus-jakarta-sans-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

// Fuentes del template Comercio: grotesca "pop" y serif de galería.
const bricolage = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin.woff2", weight: "700", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const oswald = localFont({
  src: [
    { path: "./fonts/oswald-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/oswald-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/oswald-latin.woff2", weight: "600", style: "normal" },
    { path: "./fonts/oswald-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-oswald",
  display: "swap",
});

const dmSans = localFont({
  src: [
    { path: "./fonts/dm-sans-latin.woff2", weight: "300", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-latin.woff2", weight: "700", style: "normal" },
    { path: "./fonts/dm-sans-latin-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/dm-sans-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/dm-sans-latin-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/dm-sans-latin-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-dmsans",
  display: "swap",
});

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-condensed-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-latin-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/barlow-condensed-latin-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/barlow-condensed-latin-italic-600.woff2", weight: "600", style: "italic" },
    { path: "./fonts/barlow-condensed-latin-italic-700.woff2", weight: "700", style: "italic" },
    { path: "./fonts/barlow-condensed-latin-italic-800.woff2", weight: "800", style: "italic" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Diseño y desarrollo de páginas web para negocios | Mostrate",
  description: site.description,
  openGraph: {
    title: "Diseño y desarrollo de páginas web para negocios | Mostrate",
    description: site.description,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${inter.variable} ${instrument.variable} ${playfair.variable} ${spaceGrotesk.variable} ${poppins.variable} ${newsreader.variable} ${jakarta.variable} ${jetbrains.variable} ${bricolage.variable} ${cormorant.variable} ${oswald.variable} ${dmSans.variable} ${barlow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
