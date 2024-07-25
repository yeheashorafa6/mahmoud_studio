"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiPhoneBold } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";
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
function HeaderDashboard() {
  const path = usePathname();
  return (
    <header className="flex justify-between rounded-lg items-center p-5 bg-[#182237]">
      <div>
        <h2 className="text-white capitalize">{path.split("/").pop()}</h2>
      </div>
      <div className="flex gap-x-5 items-center">
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
            className="group rounded-full bg-[#FB3278] hover:bg-[#00F9B9] px-4 sm:px-6 text-sm md:text-lg "
          >
            <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300">
              Our Brands
            </span>
            <PiPhoneBold
              size={25}
              className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute "
            />
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default HeaderDashboard;
