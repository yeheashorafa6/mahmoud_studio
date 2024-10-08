import React from "react";
import LinkItem from "./LinkItem/LinkItem";
import Image from "next/image";
import {
  MdAnalytics,
  MdAudioFile,
  MdDashboard,
  MdHome,
  MdLogout,
  MdMiscellaneousServices,
  MdMotionPhotosAuto,
  MdPeople,
  MdSlideshow,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";
import { GoProjectRoadmap } from "react-icons/go";
import { FaBloggerB } from "react-icons/fa";
import { AiFillCustomerService } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  Building2,
  Images,
  ListOrdered,
  MessageSquareText,
  SquareActivity,
  Users,
} from "lucide-react";
import Link from "next/link";

const menuItemsDashboard = [
  {
    title: "Pages",
    list: [
      {
        title: "Home Page",
        path: "/",
        icon: <MdHome size={24} />,
      },
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <MdDashboard size={24} />,
      },
      {
        title: "Users",
        path: "/Dashboard/Users",
        icon: <BsFillPeopleFill size={24} />,
      },
      {
        title: "Projects",
        path: "/Dashboard/Projects",
        icon: <GoProjectRoadmap size={24} />,
      },
      {
        title: "Blogger",
        path: "/Dashboard/Blogger",
        icon: <FaBloggerB size={24} />,
      },
    ],
  },
  {
    title: "Section",
    list: [
      {
        title: "Slider",
        path: "/Dashboard/Slider",
        icon: <Images/>,
      },
      {
        title: "Latest Projects",
        path: "/Dashboard/LatestProjects",
        icon: <MdAnalytics size={24} />,
      },
      {
        title: "Our Service",
        path: "/Dashboard/OurService",
        icon: <MdMiscellaneousServices size={24} />,
      },
      {
        title: "Reviwes",
        path: "/Dashboard/Reviwes",
        icon: <MessageSquareText />,
      },
      {
        title: "Our Customers",
        path: "/Dashboard/OurCustomers",
        icon: <Building2 size={24} />,
      },
    ],
  },
  {
    title: "Other",
    list: [
      {
        title: "Audio",
        path: "/Dashboard/Audio",
        icon: <MdAudioFile size={24} />,
      },
      {
        title: "Motion",
        path: "/Dashboard/Motion",
        icon: <SquareActivity />,
      },
      {
        title: "Sections Orders",
        path: "/Dashboard/SectionsOrders",
        icon: <ListOrdered />,
      },
    ],
  },
];
async function Sidebar() {
  const { user } = await auth();
  return (
    <div className=" h-[1262px] sticky top-[40px]">
      <Link href={"/Dashboard"}>
        <div className="cursor-pointer flex gap-x-2 items-center justify-center mb-7 p-5">
          <Image
            className="bg-cover"
            src="/assets/docLogo.png"
            width={40}
            height={40}
            alt="mhadmin"
            priority
          />
          <div className="flex flex-col">
            <h6 className="text-sm ">Mahomud F Shorafa</h6>
            <span className="text-xs text-[#b7bac1]">Administrator</span>
          </div>
        </div>
      </Link>
      <div>
        {menuItemsDashboard.map((item, index) => (
          <div key={index}>
            <span className="text-primary text-xl font-bold mx-2 my-3">
              {item.title}
            </span>
            {item.list.map((list, index) => (
              <div key={index}>
                <LinkItem list={list} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex gap-x-3 w-full bg-transparent hover:bg-[#151c2c]/50 cursor-pointer rounded-md p-4 text-sm item-center ">
          <MdLogout size={20} />
          LogOut
        </button>
      </form>
    </div>
  );
}

export default Sidebar;
