"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoMdContacts } from "react-icons/io";
import { BsChatTextFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import Image from "next/image";

function Contact() {
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const init = {
    name: "",
    subject: "",
    email: "",
    message: "",
  };
  
  const [inputsValue, setInputsValue] = useState(init);
  const misInput =
    inputsValue.name === "" ||
    inputsValue.subject === "" ||
    inputsValue.email === "" ||
    inputsValue.message === "";

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowResult(false);
        setResult("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (!misInput) {
      setResult("Sending....");
      setShowResult(true);

      const formData = new FormData(event.target);
      formData.append("access_key", "1394ff52-77b0-4d7b-87c2-841bf978a50b");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setResult("Sending Successfully 👌");
        setInputsValue(init);
      } catch (error) {
        setResult("Something went wrong! Try Again... 😢");
      }
    } else {
      setResult("Please fill all fields! 😮");
    }
  };

  return (
    <div className="bg-[#f7f7ff] px-4 py-16 sm:px-6 lg:px-8 h-full">
      <div className="mx-auto container">
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="flex-1 md:ml-10">
            <div className="flex my-12 justify-center items-center xl:justify-start">
              <h1 className="textxl md:text-3xl font-semibold text-start text-primary dark:text-[#FED000]">
                Contact With Us
              </h1>
            </div>
            <form
              onSubmit={onSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 w-full"
            >
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Name"
                    value={inputsValue.name}
                    onChange={(e) => setInputsValue({...inputsValue, name: e.target.value})}
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-primary">
                    <IoMdContacts size={20} />
                  </span>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Subject"
                    value={inputsValue.subject}
                    onChange={(e) => setInputsValue({...inputsValue, subject: e.target.value})}
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
                    name="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    value={inputsValue.email}
                    onChange={(e) => setInputsValue({...inputsValue, email: e.target.value})}
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
                    name="message"
                    placeholder="Your Message"
                    value={inputsValue.message}
                    onChange={(e) => setInputsValue({...inputsValue, message: e.target.value})}
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
                  className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute"
                />
              </Button>
            </form>
            <div className="m-5">
              <span className={!misInput ? "text-red-500" : "text-green-500"}>{result}</span>
            </div>
          </div>
          <div className="hidden lg:flex relative justify-center items-center flex-1">
            <Image src="/assets/contact.png" width={400} height={400} alt="contact" priority />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;