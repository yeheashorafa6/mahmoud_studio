"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isHiddenLayout = pathname.includes("Dashboard") || pathname.includes("Login");

  return (
    <>
      {!isHiddenLayout && <Navbar />}
      {children}
      {!isHiddenLayout && <Footer />}
    </>
  );
}