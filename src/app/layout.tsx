import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trương Công Hiếu - Full-Stack Developer",
  description: "Portfolio of Trương Công Hiếu, a passionate Full-Stack Developer skilled in Next.js, React Native, .NET, and MongoDB.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}