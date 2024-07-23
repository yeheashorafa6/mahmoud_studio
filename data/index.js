import { RiInstagramFill, RiTwitterXFill } from "react-icons/ri";

import {
  User2,
  MailIcon,
  HomeIcon,
  GraduationCap,
  Calendar,
  Laptop2,
  CalendarHeart,
} from "lucide-react";
import { PiCrownSimpleLight, PiPhoneBold } from "react-icons/pi";
import { SlPencil } from "react-icons/sl";
import {
  MdMiscellaneousServices,
  MdAnalytics,
  MdHome,
  MdAudioFile,
  MdMotionPhotosAuto,
  MdSlideshow,
  MdDashboard,
  MdOndemandVideo,
  MdPeople,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { FaBloggerB } from "react-icons/fa";
import { AiFillCustomerService } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

export const imageSlider_mb = [
  "/assets/slider/slid1_mb.png",
  "/assets/slider/slid2_mb.png",
  "/assets/slider/slid3_mb.png",
  "/assets/slider/slid4_mb.png",
];

export const navItem = [
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
  // {
  //   id:4,
  //   name: "Contact",
  //   path: "/Contact",
  // },
];

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

export const infoData = [
  { icon: <User2 size={20} />, text: "Mahmoud F Alshourafa" },
  {
    icon: <PiPhoneBold size={20} />,
    text: "+972 567 319 027",
    path: "https://wa.me/972598331702",
  },
  {
    icon: <MailIcon size={20} />,
    text: "info@mah-studio.com",
    path: "mailto:info@mah-studio.com ",
  },
  { icon: <Calendar size={20} />, text: "Born in 1 Juny 1994" },
  { icon: <GraduationCap size={20} />, text: "Multimedia" },
  { icon: <HomeIcon size={20} />, text: "Gaza , Palestine" },
];

export const qualificationData = [
  {
    title: "education",
    data: [
      {
        university: "IUG",
        role: "Sowftware Development",
        years: "2019 - 2020",
      },
      {
        university: "Al Azher",
        role: "Front End",
        years: "2021 - 2022",
      },
      {
        university: "IUG",
        role: "Back End And Full Stack",
        years: "2013 - 2024",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "Y S",
        role: "Front End Developer",
        years: "2020 - 2022",
      },
      {
        company: "N W",
        role: "full Stack",
        years: "2022 - 2023",
      },
      {
        company: "E M",
        role: "Back End Developer",
        years: "2023 - 2024",
      },
    ],
  },
];

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

export const menuItemsDashboard = [
  {
    title: "Pages",
    list: [
      {
        title: "Home Page",
        path: "/",
        icon: <MdHome />,
      },
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/Dashboard/Users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Projects",
        path: "/Dashboard/Projects",
        icon: <GoProjectRoadmap />,
      },
      {
        title: "Blogger",
        path: "/Dashboard/Blogger",
        icon: <FaBloggerB />,
      },
    ],
  },
  {
    title: "Section",
    list: [
      {
        title: "Slider",
        path: "/Dashboard/Slider",
        icon: <MdSlideshow />,
      },
      {
        title: "Latest Projects",
        path: "/Dashboard/LatestProjects",
        icon: <MdAnalytics />,
      },
      {
        title: "Our Service",
        path: "/Dashboard/OurService",
        icon: <MdMiscellaneousServices />,
      },
      {
        title: "Reviwes",
        path: "/Dashboard/Reviwes",
        icon: <MdPeople />,
      },
      {
        title: "Our Customers",
        path: "/Dashboard/OurCustomers",
        icon: <AiFillCustomerService />,
      },
    ],
  },
  {
    title: "Other",
    list: [
      {
        title: "Audio",
        path: "/Dashboard/Audio",
        icon: <MdAudioFile />,
      },
      {
        title: "Motion",
        path: "/Dashboard/Motion",
        icon: <MdMotionPhotosAuto />,
      },
    ],
  },
];

export const category = [
  { name: "Branding And Identity" },
  { name: "Digital Marketing" },
  { name: "Media Coverage" },
  { name: "Motion graphics" },
  { name: "Account Management" },
  { name: "Audio recordings" },
];
