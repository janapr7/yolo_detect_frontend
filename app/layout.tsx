import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { MinWidthFallback } from "@/components/atoms/EdgeCase/MinWidthFallback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palm Type Detection App | YOLO Model with FastAPI & Next.js",
  description:
    "Detect palm types instantly with our YOLO-powered web app. Built with Next.js for a sleek frontend and FastAPI for blazing-fast AI inference using a custom-trained YOLO model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MinWidthFallback />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
