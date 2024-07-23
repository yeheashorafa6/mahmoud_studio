"use client";
import React, { useEffect, useState } from "react";
import ThemeToggler from "../ThemeToggler";
import Nav from "./Nav/Nav";
import Image from "next/image";
import Link from "next/link";
import { RiMenu4Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { PiPhoneBold } from "react-icons/pi";

function Navbar() {
  // STATE
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  // == STATE ==

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        sticky ? "py-4 shadow-md bg-[#8829FF]/85 " : "py-6 bg-[#8829FF]"
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between" >
         <motion.div className="flex-1 flex items-center gap-12 " initial={{ opacity: 0 , x : "-50px" }} animate={{  opacity: 1 , x : 0 }}transition={{ duration: 2 ,  type: "tween" }}>
         <Link href={"/"} className="">
            <Image
              src={"/assets/logo.png"}
              width={75}
              height={75}
              alt="logo"
              priority
             
            />
          </Link>
         </motion.div>

          <div className="md:flex items-center md:gap-12">
            <Nav isOpen={open} isSticky={sticky} />
            {/* <ThemeToggler /> */}
            <Link href={"https://wa.me/972598331702"}>
                <Button
                  sr="true"
                  className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-4 sm:px-6 text-sm md:text-lg "
                >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300'>Contact Us</span>
                  <PiPhoneBold size={25} className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute '/>
                </Button>
              </Link>
          </div>
          <div className="block md:hidden">
            <button
              onClick={handleClick}
              className="p-2 m-2 mt-3 text-2xl rounded text-white transition hover:text-[#00F9B9]/75 dark:bg-transparent dark:text-white dark:hover:text-white/75"
            >
              <AnimatePresence>
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    // exit={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IoClose />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    // exit={{ rotate: 0 }}
                    transition={{ duration: .5 }}
                  >
                    <RiMenu4Line />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;