import React from "react";
import Image from "next/image";
import { CalendarHeart, Laptop2 } from "lucide-react";
import { SlPencil } from "react-icons/sl";
import { MdOndemandVideo } from "react-icons/md";
import { PiCrownSimpleLight } from "react-icons/pi";
export const skillsData = [
  {
    title: "skills",
    data: [
      {
        path: "/assets/about/icon1.png",
        icon: <PiCrownSimpleLight size={20} />,
        name: "Branding and Identity ",
      },
      {
        path: "/assets/about/icon2.png",
        icon: <MdOndemandVideo size={20} />,
        name: "Account Management",
      },
      {
        path: "/assets/about/icon3.png",
        icon: <SlPencil size={20} />,
        name: "Digital Marketing",
      },
      {
        path: "/assets/about/icon4.png",
        icon: <Laptop2 size={20} />,
        name: "Media Coverage",
      },
      {
        path: "/assets/about/icon5.png",
        icon: <CalendarHeart size={20} />,
        name: "Motion graphics",
      },
    ],
  },
  {
    title: "tools",
    data: [
      { imgPath: "/assets/about/1.svg" },
      { imgPath: "/assets/about/2.svg" },
      { imgPath: "/assets/about/3.svg" },
      { imgPath: "/assets/about/4.svg" },
      { imgPath: "/assets/about/5.svg" },
    ],
  },
  {},
];
function SkillsContent() {
  const getData = (arr, title) => {
    return arr.find((item) => item.title === title);
  };
  const skillData = getData(skillsData, "skills");
  const toolsData = getData(skillsData, "tools");

  return (
    <div className="text-center md:text-start ">
      <h3 className="text-3xl font-bold mb-5 text-white dark:text-black">
        My Awosame Skills
      </h3>
      <div className="flex flex-col  gap-y-5 mb-12">
        <div className="flex flex-col gap-y-3">
          <h1 className="w-full pb-2 font-semibold text-2xl border-b text-[#FED000]">
            Skills
          </h1>
          {skillData.data.map((item, index) => (
            <div
              className="flex flex-col gap-x-4 ml-20 md:ml-0 md:mx-0"
              key={index}
            >
              <div className="flex  items-center">
                <Image src={item.path} alt={item.name} width={80} height={80} />
                <h3 className="text-white font-medium  capitalize dark:text-gray-900">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="border-b  w-full pb-2 font-semibold text-lg xl:text-xl text-[#FED000]">
            Tools
          </h2>
          {toolsData.data.map((item, index) => (
            <div
              className="inline-flex ml-4 item-center justify-center my-5 mx-auto"
              key={index}
            >
              <Image
                src={item.imgPath}
                alt="tools"
                priority
                width={45}
                height={45}
                className="hover:bg-secondary rounded-full transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsContent;
