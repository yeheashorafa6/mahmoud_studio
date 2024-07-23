import React from "react";
import { menuItemsDashboard } from "../../../../data";
import LinkItem from "./LinkItem/LinkItem";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { auth, signOut } from "@/app/auth";

async function Sidebar() {
  const { user } = await auth();
  return (
    <div className=" h-[1050px] sticky top-[40px]">
      <div className="flex gap-x-2 items-center justify-center mb-7 p-5">
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
      <div>
        {menuItemsDashboard.map((item, index) => (
          <div key={index}>
            <span className="text-[#b7bac1] text-lg mx-2 my-3">
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
