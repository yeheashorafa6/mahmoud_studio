import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteCoustome } from '@/lib/action';
import { fetchCustomes } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { SiYamahacorporation } from "react-icons/si";

async function OurCustomersPage({searchParams}) {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
  
    const { count, coustomes } = await fetchCustomes(q, page);
  
    return (
        <div className="w-full mt-2 p-4 bg-[#182237]">
          <div className="flex justify-between items-center">
            <Search placeholder="Search For A Customers..." />
            <div>
              <Link href={"/Dashboard/OurCustomers/Add"}>
                <button className="flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black">
                  <span>Add new</span>
                  <SiYamahacorporation size={20}/>
                </button>
              </Link>
            </div>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <td className='p-3'>Title</td>
                <td className='p-3'>Image</td>
                <td className='p-3'>Created At</td>
                <td className="flex justify-center p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {coustomes.map((coustome, index) => (
                <tr key={coustome.id} className='border-b border-gray-700 last:border-none'>
                  <td className=" flex items-center gap-x-3 p-3">
                    <span>{coustome.title}</span>
                  </td>
                  <td className="p-3">
                    <div className="relative w-96 h-44 ">
                      <Image
                        src={coustome.img}
                        alt={coustome.title}
                        fill
                        className='absolute w-full h-full'
                      />
                    </div>
                  </td>
                  <td className='p-3'>{coustome.createdAt?.toString().slice(4, 16)}</td>
                  <td className='p-3'>
                    <div className="flex gap-x-2 justify-center items-center">
                      <Link
                        href={`/Dashboard/OurCustomers/${coustome.id}`}
                        className="p-2 "
                      >
                        <button className="flex items-center gap-x-3">
                        <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                        </button>
                      </Link>
                      <form action={deleteCoustome}>
                        <input type="hidden" name="id" value={coustome.id} />
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
          <Pagination count={count} />
        </div>
      );
}

export default OurCustomersPage
