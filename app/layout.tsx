import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MODO4 | Vive. Trabaja. Quédate.",
  description:
    "Rentas flexibles en Xola, Colinas de Echegaray, Condesa y Colonia del Valle: oficinas, habitaciones y departamentos amueblados.",
  applicationName: "MODO4",
  keywords: [
    "MODO4",
    "modo4.mx",
    "rentas flexibles CDMX",
    "oficinas Xola",
    "departamentos amueblados Condesa",
    "Colinas de Echegaray",
    "Colonia del Valle",
  ],
  openGraph: {
    title: "MODO4 | Vive. Trabaja. Quédate.",
    description:
      "Espacios premium para vivir, trabajar o quedarse por temporada en cuatro zonas de la Ciudad de México.",
    siteName: "MODO4",
    locale: "es_MX",
    type: "website",
    url: "https://modo4.mx",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
