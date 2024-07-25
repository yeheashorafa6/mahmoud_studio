"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const navItem = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Blogger",
    path: "/Blogger",
  },
  {
    id: 3,
    name: "My Projects",
    path: "/Projects",
  },

];
function Nav({ isOpen, isSticky }) {
  const path = usePathname();

  return (
    <nav aria-label="Global" className={`md:block mb-2`}>
      <ul
        className={`md:mt-2 text-lg fixed flex w-full items-center flex-col md:flex-row left-0 top-[90px] transition-all duration-500
          right-0 gap-5 md:relative pl-[4rem] lg:pl-0 md:top-0 md:h-full ${
            isOpen ? "h-[150px] bg-[#8829FF]/85 lg:h-auto" : "h-0 lg:h-auto"} ${isSticky
            ? "shadow-md lg:shadow-none dark:bg-[#8829FF]/85 lg:dark:bg-transparent"
            : ""} rounded-b-lg overflow-hidden lg:overflow-visible`}
      >
        {navItem.map((item, index) => (
          <motion.li key={index}  initial={{ opacity: 0 , x : "-50px" }} animate={{  opacity: 1 , x : 0 }}transition={{ duration: 2 }}>
            <Link
              className={`${item.path === path ? 'text-[#00F9B9]' : "text-white dark:text-gray-900"} transition-all duration-300 hover:text-[#fed000] hover:scale-75 transform relative dark:hover:text-primary/75`}
              href={item.path}
            >
              {item.path === path && (
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
      </ul>
    </nav>
  );
}

export default Nav;