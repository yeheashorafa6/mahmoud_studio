import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import Link from 'next/link';
import React from 'react'
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { fetchBloggers } from '@/lib/data';
import { deleteBlogger } from '@/lib/action';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineDocumentPlus } from "react-icons/hi2";

async function BloggerPage({searchParams}) {
    
  const q =searchParams?.q || "";
  const page =searchParams?.page || 1;

  const {count , blogger} = await fetchBloggers(q,page);

  return (
    <div className='w-full mt-2 p-4 bg-[#182237]'>
      <div className='flex justify-between items-center'>
        <Search placeholder='Searh For A Blogger...'/>
        <div>
          <Link href={"/Dashboard/Blogger/Add"} >
            <button className='flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black'>
              <span>Add new</span>
              <HiOutlineDocumentPlus size={20}/>
            </button>
          </Link>
        </div>
      </div>
      <table className='w-full mt-3'>
        <thead>
          <tr>
            <td>Title</td>
            {/* <td>Descripation</td> */}
            <td className='p-3'>Category</td>
            <td className='p-3'>Image</td>
            <td className='p-3'>Created At</td>
            <td className='flex justify-center p-3'>Action</td>
          </tr>

        </thead>
        <tbody>
          {
            blogger.map((blogger , index)=>(
              <tr key={index} className='border-b border-gray-700 last:border-none'>
                <td className='p-3'>{blogger.title}</td>
                {/* <td className='mx-w-[150px]'>{blogger.desc}</td> */}
                <td  className='p-3'>{blogger.category}</td>
                <td className='p-5 m-3'>
                  <div className='relative w-96 h-44 '>
                  <Image src={blogger.img} className=' m-2 absolute w-full h-full' fill alt='mh' priority />
                  </div>
                </td>
                <td className='p-3'>{blogger.createdAt?.toString().slice(4,16)}</td>
                <td className='p-3'>
                  <div className='flex gap-x-2  items-center'>
                    <Link href={`/Dashboard/Blogger/${blogger.id}`}  className='p-2 '>
                    <button className='flex items-center gap-x-3 '>
                    <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                    </button>
                    </Link>
                    <form action={deleteBlogger}>
                      <input type="hidden" name="id" value={blogger.id}/>
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
            ))
          }
        </tbody>
      </table>
      {/* <div className='w-full flex justify-center'> */}
        <Pagination count={count}/>
      {/* </div> */}
    </div>
  )
}

export default BloggerPage
