"use client";
import { Button } from "../ui/button";
import { PiPhoneBold } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import Link from "next/link";
import Image from "next/image";
import { AiFillBehanceCircle } from "react-icons/ai";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
const variantsx = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2.5,
    },
  },
};
export const linkItem = [
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
function Hero() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <motion.section className={` py-12 xl:py-16   xl:pt-20 z-20 ${showMore && 'lg'}`}>
      <motion.div className="container mx-auto">
        <motion.div className=" flex-col lg:flex-row flex gap-5 justify-center lg:justify-between items-center xl:mx-20">
          <motion.div className="text-center lg:text-start justify-between flex flex-col flex-1 gap-5 w-full">
            <TextGenerateEffect
              words={`Hello, My Name is Mahmoud Shorafa creative solution Base in Gaza`}
              className="text-xl md:text-2xl xl:w-[32vw] lg:w-[45vw] md:w-[67vw] sm:w-[71vw] capitalize text-center lg:text-start mx-auto lg:mx-0"
            />
            <motion.div className="flex flex-col justify-between">
            <motion.p className={`xl:text-lg lg:text-2xl md:text-2xl text-xl mx-auto lg:mx-0 sm:w-[26rem] md:w-[30rem] text-center lg:text-justify ${showMore ? "text-justify md:w-[40rem]" : "line-clamp-3"}`}>
                As a passionate and creative Graphic Designer with 10 years of
                experience, I specialize in transforming ideas into visually
                captivating designs. My expertise lies in utilizing Adobe
                Creative Suite to develop innovative graphics for a wide range
                of media, including print, digital, and social platforms. With a
                keen eye for detail and a strong understanding of design
                principles, I excel at creating compelling visuals that
                effectively communicate brand messages and engage audiences. I
                thrive in collaborative environments, working closely with
                clients and team members to deliver high-quality design
                solutions that meet project goals and exceed expectations.
              </motion.p>
              <motion.div
                variants={variantsx}
                initial="initial"
                whileInView="animate"
                className="text-center"
              >
                <button
                  onClick={toggleShowMore}
                  className="readMore md:ml-52 lg:ml-0 text-primary mt-2 flex gap-x-2 group items-center transition-all duration-500 hover:text-primary/70"
                >
                  {showMore ? "Show Less" : "Show More"} <FaArrowRightLong className="arrow" />
                </button>
              </motion.div>
            </motion.div>
            <motion.div className="mt-4 mx-auto lg:mx-0 flex flex-col sm:flex-row">
              <Link target="_blank" href={"https://wa.me/972598331702"}>
                <Button
                  sr="true"
                  className="group rounded-full hover:bg-[#00F9B9] me-0 sm:me-4 px-6 sm:text-lg md:text-2xl lg:text-lg mb-4 lg:mb-0"
                >
                  <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300'>Contact Us</span>
                  <PiPhoneBold size={25} className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute '/>
                </Button>
              </Link>
              <Link target="_blank" href={"https://www.behance.net/mahmoudstudio2"}>
                <Button
                  sr="true"
                  className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-6 sm:text-lg md:text-2xl lg:text-lg"
                >
                   <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300'>Our Brands</span>
                   <AiFillBehanceCircle size={25} className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute '/>
                </Button>
              </Link>
            </motion.div>
            <motion.div className="flex mt-10 gap-x-5 justify-center lg:justify-start items-center">
              {linkItem.map((link, index) => (
                <Link
                target="_blank"
                  className="text-gray-900 dark:text-gray-300 hover:text-[#00F9B9] cursor-pointer transition-all duration-300"
                  key={index}
                  href={link.path}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="hidden md:flex max-w-[500px] max-h-[500px] mt-10 lg:mt-0 justify-center flex-1 ">
            <Image
              src={"/assets/hero/mh.png"}
              alt="hero"
              width={400}
              height={400}
              priority
              className=""
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
