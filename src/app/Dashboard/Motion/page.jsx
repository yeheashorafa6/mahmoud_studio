import Pagination from "@/components/DashboardComp/Pagination/Pagination";
import Search from "@/components/DashboardComp/Search/Search";
import { deleteMotion } from "@/lib/action"; // تأكد من تحديث المسار الصحيح لدالة deleteMotion
import { fetchMotions } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiViewList } from "react-icons/ci";
import { IoPersonAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

async function MotionPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, motions } = await fetchMotions(q, page);

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center">
        <Search placeholder="Search For Motions..." />
        <div>
          <Link href={"/Dashboard/Motion/Add"}>
            <button className="flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black">
              <span>Add new</span>
              <IoPersonAdd />
            </button>
          </Link>
        </div>
      </div>
      <table className="w-full mt-3">
        <thead>
          <tr>
            <td>Title</td>
            <td>Media</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {motions.map((motion, index) => (
            <tr key={index}>
              <td>{motion.title}</td>
              <td>
                {motion.media.map((item, idx) => (
                  <div key={idx}>
                    {
                      item.type === "image" && (
                        <Image
                          src={item.url}
                          className="rounded-full m-2"
                          width={50}
                          height={50}
                          alt="media"
                          priority
                        />
                      )
                      // : (
                      //   <video width={50} height={50} className='rounded-full m-2' controls>
                      //     <source src={item.url} type="video/mp4" />
                      //     Your browser does not support the video tag.
                      //   </video>
                      // )
                    }
                  </div>
                ))}
              </td>
              <td>
                <div className="flex gap-x-2 items-center">
                  <Link
                    href={`/Dashboard/Motion/${motion.id}`}
                    className="p-2 bg-blue-900 rounded-full hover:bg-blue-900/50"
                  >
                    <button className="flex items-center gap-x-3">
                      <span>View</span>
                      <CiViewList />
                    </button>
                  </Link>
                  <form action={deleteMotion}>
                    <input type="hidden" name="id" value={motion.id} />
                    <button className="flex items-center gap-x-3 p-2 bg-red-900 rounded-full hover:bg-red-900/50">
                      <span>Delete</span>
                      <MdDelete />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
}

export default MotionPage;
