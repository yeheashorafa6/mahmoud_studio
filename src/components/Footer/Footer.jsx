"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { linkItem, navItem } from "../../../data";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AiFillBehanceCircle } from "react-icons/ai";

function Footer() {
  const path = usePathname();

  return (
    <>
      <footer className="bg-primary py-8">
        <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between ">
            <div className="flex justify-center items-center">
              <div className="justify-center items-center md:items-start relative flex flex-col">
                <Link className="block relative  py-5" href="/">
                  <Image
                    src={"/assets/footerLogo.png"}
                    width={200}
                    height={170}
                    alt="logo"
                    priority
                    className="bg-center overflow-hidden"
                  />
                </Link>
                <p className="max-w-sm text-white text-sm mb-4 text-center md:text-justify">
                  Mahmoud Studio provides creative services in design, motion
                  graphics, voice recordings, editing, and cartoon drawing. We
                  deliver high-quality, customized solutions.
                </p>
              </div>
            </div>
            <div className=" flex  items-center text-center flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
              {navItem.map((item) => {
                console.log(item.path);
                return (
                  <div key={item.id}>
                    <Link
                      className={`${
                        item.path === path
                          ? "text-[#00F9B9]"
                          : "text-white dark:text-gray-900"
                      } transition-all duration-300 hover:text-[#fed000] relative dark:hover:text-[#00F9B9]/75`}
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
                  </div>
                );
              })}{" "}
            </div>

            <div className="py-6 flex flex-col  justify-center gap-6 md:gap-8">
              <div className="flex flex-row  gap-6 md:gap-8 justify-center">
                {linkItem.map((link) => (
                  <div key={link.id}>
                    <Link
                      className="dark:text-gray-900 text-white hover:text-[#00F9B9] cursor-pointer transition-all duration-300"
                      href={link.path}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
              <Link href={"https://www.behance.net/mahmoudstudio2"}>
                <Button
                  sr="true"
                  className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-6 sm:text-lg md:text-2xl lg:text-lg"
                >
                  <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300">
                    Our Brands
                  </span>
                  <AiFillBehanceCircle
                    size={25}
                    className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute "
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-black py-4">
        <div className="mx-auto container flex flex-col md:flex-row justify-between text-white">
          <p className="dark:text-gray-800 text-gray-100 text-center text-[12px] md:text-sm">
            Copyright © 2024. All rights reserved. |{" "}
            <Link
              className="hover:text-secondary dark:hover:text-[#FED000] cursor-pointer"
              href={"https://www.behance.net/mahmoudstudio2"}
            >
              MAHMOUD STUDIO{" "}
            </Link>{" "}
          </p>
          <p className="text-center dark:text-gray-800 text-white text-[12px] md:text-sm">
            Design By |
            <Link
              href={"https://my-portfolio-sepia-xi-70.vercel.app/"}
              className="hover:text-secondary dark:hover:text-[#FED000]  cursor-pointer"
            >
              {" "}
              Yehea Shorafa
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
