import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand, Source_Sans_3 } from "next/font/google";
import AuthProvider from "../utils/AuthProvider";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--quicksand",
});

const source_sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--source_sans",
});

export const metadata: Metadata = {
  title: "Trocado",
  description: "Première plateforme E-swap de France",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html
        lang="en"
        className={`${quicksand.variable} ${source_sans.variable}`}
      >
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
