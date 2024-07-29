import Search from "@/components/DashboardComp/Search/Search";
import Link from "next/link";
import React from "react";
import { IoPersonAdd } from "react-icons/io5";
import { usersDashboard } from "../../../../data";
import Image from "next/image";
import { CiViewList } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Pagination from "@/components/DashboardComp/Pagination/Pagination";
import { fetchUsers } from "@/lib/data";
import { deleteUser } from "@/lib/action";
import { FiEdit } from "react-icons/fi";


async function UserPage({searchParams}) {
  
  const q =searchParams?.q || "";
  const page =searchParams?.page || 1;

  const {count , users} = await fetchUsers(q,page);
  // console.log(users);
 

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center">
        <Search placeholder="Searh For A User..." />
        <div>
          <Link href={"/Dashboard/Users/Add"}>
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
            <td className="p-3">username</td>
            <td className="p-3">Email</td>
            <td className="p-3">Created At</td>
            <td className="p-3">Role</td>
            <td className="flex justify-center p-3">Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 last:border-none">
              <td className="flex items-center gap-x-3 p-3">
                <span>{user.username}</span>
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.createdAt?.toString().slice(4,16)}</td>
              <td className={`${user.isAdmin ? 'text-green-500' : 'text-yellow-500'} p-3`}>{user.isAdmin ? "Admin" : "User"}</td>
              <td className="p-3">
                <div className="flex gap-x-2 justify-center items-center">
                  <Link //${encodeURIComponent( user.username.replace(/\s+/g, "-").toLowerCase()
                    href={`/Dashboard/Users/${user.id}`}
                    className="p-2 "
                  >
                    <button className="flex items-center gap-x-3 ">
                    <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id}/>
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
      {/* <div className='w-full flex justify-center'> */}
      <Pagination count={count}/>
      {/* </div> */}
    </div>
  );
}

export default UserPage;
