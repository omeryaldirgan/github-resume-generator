import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ResumeProvider } from "@/context/ResumeContext";
import { ThemeProvider } from '@/context/ThemeContext';
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "GitHub Resume Generator",
  description: "Transform your GitHub profile into a professional resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <ResumeProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </ResumeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
