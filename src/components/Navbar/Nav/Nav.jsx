"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PiPhoneBold } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const navItem = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Blogger", path: "/Blogger" },
  { id: 3, name: "My Projects", path: "/Projects" },
];

const linkItem = [
  {
    id: 1,
    name: <FaFacebookF size={25} />,
    path: "https://www.facebook.com/profile.php?id=61560187817624",
  },
  {
    id: 2,
    name: <RiInstagramFill size={25} />,
    path: "https://www.instagram.com/mahmoudstudio24/",
  },
  {
    id: 3,
    name: <RiTwitterXFill size={25} />,
    path: "https://x.com/mahmoudstudio24",
  },
];

function Nav({ isOpen, isSticky }) {
  const path = usePathname();

  return (
    <nav aria-label="Global" className="">
      <ul
        className={`fixed flex w-full items-center bg-[#8829FF]/85 overflow-hidden border-white/70 flex-col left-0 top-[90px] transition-all duration-500
             right-0 gap-5 lg:relative lg:flex-row lg:p-0 lg:top-0 lg:border-none lg:h-full ${
               isOpen ? "h-screen px-4 w-full" : "h-0"
             } ${
          isSticky ? "shadow-md lg:shadow-none" : ""
        } rounded-b-lg overflow-hidden lg:overflow-visible`}
      >
        {navItem.map((item, index) => (
          <motion.li key={index} className="lg:w-auto">
            <Link
              className={`${
                (item.path === "/" ? path === item.path : path.startsWith(item.path))
                  ? "text-[#00F9B9]"
                  : "text-white "
              } transition-all duration-300 hover:text-[#fed000] hover:scale-75 w-full block transform relative py-2 lg:py-0`}
              href={item.path}
            >
              {(item.path === "/" ? path === item.path : path.startsWith(item.path)) && (
                <motion.span
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "tween" }}
                  className="absolute left-0 top-full h-[2px] bg-[#00F9B9] w-full mt-2"
                />
              )}
              {item.name}
            </Link>
          </motion.li>
        ))}
        
        {isOpen && (
          <>
            <div className="flex gap-4 mt-4">
              {linkItem.map((link) => (
                <Link
                  key={link.id}
                  target="_blank"
                  className="text-white hover:text-[#00F9B9] cursor-pointer transition-all duration-300"
                  href={link.path}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link href={"https://wa.me/972598331702"} className="mt-4">
            <Button
                  sr="true"
                  className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-4 sm:px-6 text-sm md:text-lg "
                >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300'>Contact Us</span>
                  <PiPhoneBold size={25} className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute '/>
                </Button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;