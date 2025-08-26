import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trương Công Hiếu - Frontend Developer",
  description: "Portfolio of Trương Công Hiếu, a passionate frontend developer skilled in Next.js, React, Tailwind CSS, and more.",
  icons: {
    icon: '/images/h.png', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}