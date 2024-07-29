import Pagination from "@/components/DashboardComp/Pagination/Pagination";
import Search from "@/components/DashboardComp/Search/Search";
import { deleteMotion } from "@/lib/action"; 
import { fetchMotions } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { TbBrandFramerMotion } from "react-icons/tb";

async function MotionPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, motions } = await fetchMotions(q, page);

  console.log(motions[0].media[0].type);

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center mb-4">
        <Search placeholder="Search For Motions..." />
        <Link href={"/Dashboard/Motion/Add"}>
          <button className="flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black">
            <span>Add new</span>
            <TbBrandFramerMotion size={20} />
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left ">
          <thead className="">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Image</th>
              <th className="p-3">Video</th>
              <th className="p-3 flex justify-end mr-7">Action</th>
            </tr>
          </thead>
          <tbody>
            {motions.map((motion, index) => (
              <tr key={index} className="border-b border-gray-700 last:border-none">
                <td className="p-3">{motion.title}</td>
                <td className="p-3 flex flex-wrap">
                  {motion.media.map((item, idx) => (
                    <div key={idx} className="m-2">
                      {item.type === "image" ? (
                        <Image
                          src={item.url}
                          width={100}
                          height={100}
                          alt="media"
                          priority
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </td>
                <td className="p-3 ">
                  {motion.media.map((item, idx) => (
                    <div key={idx} className="m-2">
                      {item.type === "video" ? (
                        <>
                          {console.log(item.type)}
                          <video
                            width={200}
                            height={200}
                            controls
                          >
                            <source src={item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </td>
                <td className="p-3">
                  <div className="flex gap-x-2 items-center justify-end">
                    <Link
                      href={`/Dashboard/Motion/${motion.id}`}
                      className="p-2 "
                    >
                      <button className="flex items-center gap-x-3">
                        <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                      </button>
                    </Link>
                    <form action={deleteMotion}>
                      <input type="hidden" name="id" value={motion.id} />
                      <button className="flex items-center gap-x-3 p-2 ">
                        <MdDelete
                          size={30}
                          className="text-red-900 rounded-full hover:text-red-900/50"
                        />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Pagination count={count} />
      </div>
    </div>
  );
}

export default MotionPage;
