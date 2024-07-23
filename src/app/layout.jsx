"use client";
import "./globals.css";
import "./fontStyle.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import DrawingComponent from "@/components/ui/DrawingComponent";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHiddenLayout = pathname.includes("Dashboard") || pathname.includes("Login");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DrawingComponent />
          {/* HEADER */}
          {!isHiddenLayout && <Navbar />}
          {/* == HEADER == */}

          {children}

          {/* FOOTER */}
          {!isHiddenLayout && <Footer />}
          {/* == FOOTER == */}
        </ThemeProvider>
      </body>
    </html>
  );
}
