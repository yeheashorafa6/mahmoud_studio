"use client";
import Image from "next/image";
import { RiArrowDownSLine } from "react-icons/ri";
import AboutTabs from "./Tabs/AboutTabs";
import Title from "../Title/Title";

function About() {
  return (
    <section className=" bg-[#972AED]  h-full pb-5  bg-no-repeat bg-cover relative  ">
      <div className="sm:container mx-auto">
        <div className="flex flex-col gap-5 justify-between items-center lg:mx-16">
            <div className="justify-center items-center flex mt-20 mb-6">
                {/* <div className="shapeImg bg-dot w-5 h-5 bg-center bg-no-repeat rounded-full " /> */}
                <h1 className="text-3xl font-semibold ml-2 text-white dark:text-[#FED000]">About</h1>
            </div>
          <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-x-10 ">
            <div className="hidden lg:flex relative">
              {/* <div className="bg-AboutShapeLight absolute  left-20  dark:bg-AboutShapeDark w-[500px] h-[500px] bg-no-repeat bg-center overflow-hidden"> */}
              <Image
                src={"/assets/about/aboutsec.png"}
                alt="developer"
                width={400}
                height={400}
                priority
                className=""
              />
              {/* </div> */}
            </div>
            <div className="block ">
              <AboutTabs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
