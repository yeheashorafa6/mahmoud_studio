import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import Link from 'next/link';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { ProductsDashboard } from '../../../../data';
import Image from 'next/image';
import { fetchBloggers } from '@/lib/data';
import { deleteBlogger } from '@/lib/action';

async function BloggerPage({searchParams}) {
    
  const q =searchParams?.q || "";
  const page =searchParams?.page || 1;

  const {count , blogger} = await fetchBloggers(q,page);

  return (
    <div className='w-full mt-2 p-4 bg-[#182237]'>
      <div className='flex justify-between items-center'>
        <Search placeholder='Searh For A Products...'/>
        <div>
          <Link href={"/Dashboard/Blogger/Add"} >
            <button className='flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black'>
              <span>Add new</span>
              <IoPersonAdd/>
            </button>
          </Link>
        </div>
      </div>
      <table className='w-full mt-3'>
        <thead>
          <tr>
            <td>Title</td>
            {/* <td>Descripation</td> */}
            <td>Category</td>
            <td>Image</td>
            <td>Created At</td>
            <td className='flex justify-center'>Action</td>
          </tr>

        </thead>
        <tbody>
          {
            blogger.map((blogger , index)=>(
              <tr key={index}>
                <td className=''>{blogger.title}</td>
                {/* <td className='mx-w-[150px]'>{blogger.desc}</td> */}
                <td >{blogger.category}</td>
                <td>
                  <Image src={blogger.img} className='rounded-full m-2' width={50} height={50} alt='mh' priority />
                </td>
                <td>{blogger.createdAt?.toString().slice(4,16)}</td>
                <td>
                  <div className='flex gap-x-2  items-center'>
                    <Link href={`/Dashboard/Blogger/${blogger.id}`}  className='p-2 bg-blue-900 rounded-full hover:bg-blue-900/50'>
                    <button className='flex items-center gap-x-3 '>
                      <span>View</span>
                      <CiViewList/>
                    </button>
                    </Link>
                    <form action={deleteBlogger}>
                      <input type="hidden" name="id" value={blogger.id}/>
                      <button className="flex items-center gap-x-3 p-2 bg-red-900 rounded-full hover:bg-red-900/50">
                        <span>Delete</span>
                        <MdDelete />
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
