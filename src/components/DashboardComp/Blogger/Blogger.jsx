import React from "react";
import Link from "next/link";
import { MdVisibility } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

function Blogger({ mostVisitedBlogs }) {
  // console.log("Blogger page : ", mostVisitedBlogs);
  return (
    <>
      <h1 className="text-primary ">The Most Blogger Seen</h1>
      {mostVisitedBlogs.map((blog) => {
        return (
          <Link
            key={blog.id}
            href={`/Dashboard/Blogger`}
            className="bg-[#182237] hover:bg-[#182237]/50 cursor-pointer p-5 flex gap-x-3 rtl flex-col-reverse rounded-xl w-full"
          >
            <div className="flex flex-col gap-y-4 rtl:items-end">
              <div className="flex justify-start items-center text-lg gap-x-2">
                <span >{blog.visits}</span>
                <FaRegEye />
              </div>
              <div className="justify-end flex">
                <h1 className="text-xl font-bold  ">{blog?.title}</h1>
              </div>
              <p className="text-base justify-end flex ">{blog?.desc}</p>
              {/* Additional content or elements can be added here */}
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Blogger;
