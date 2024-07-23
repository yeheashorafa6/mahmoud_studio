"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoMdContacts } from "react-icons/io";
import { BsChatTextFill } from "react-icons/bs";

import { MdAlternateEmail } from "react-icons/md";
import Image from "next/image";
function Contact() {
  // const variants = {
  //   initial: {
  //     opacity: 0,
  //     y: -100,
  //   },
  //   animate: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 1,
  //     },
  //   },
  // };

  const init = {
    email: "",
    username: "",
    message: "",
  };

  // STATE
  const [inputsValue, setInputsValue] = useState(init);
  const [result, setResult] = useState("");
  return (
    <div className=" bg-[#f7f7ff] px-4 py-16 sm:px-6 lg:px-8 h-full  ">
      <div className="mx-auto container">
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="flex-1 md:ml-10">
            <div className="flex my-12 justify-center items-center xl:justify-start">
              {/* <div className="shapeImg bg-dot dark:bg-dotsDark w-7 h-7 bg-center bg-no-repeat " /> */}
              <h1 className="textxl md:text-3xl font-semibold text-start text-primary dark:text-[#FED000]">
                Contact With Us
              </h1>
            </div>
            <form
              action="#"
              className="mb-0 mt-6 space-y-4  rounded-lg p-4 w-full "
            >
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Subject"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-primary">
                    <BsChatTextFill size={20} />
                  </span>
                </div>
              </div>
              <div>

                <div className="relative">
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-primary">
                    <MdAlternateEmail size={20} />
                  </span>
                </div>
              </div>

              <div>
                <div className="relative">
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    rows="6"
                    placeholder="Your Message"
                  ></textarea>
                </div>
              </div>

              <Button
                sr="true"
                className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-6 w-full sm:text-lg md:text-2xl lg:text-lg"
              >
                <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300">
                  Contact Us
                </span>
                <IoMdContacts
                  size={25}
                  className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute "
                />
              </Button>
            </form>
          </div>

          <div className="hidden lg:flex relative justify-center  items-center flex-1">
            {/* <div className="absolute w-[550px] h-[550px] bg-man bg-no-repeat bg-center -top-0 -left-2" />
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="bg-line w-[500px] h-[500px] bg-no-repeat relative bg-bottom -top-20"
            ></motion.div> */}
            <Image src="/assets/contact.png" width={400} height={400} alt="contact" priority/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
