import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import Link from 'next/link';
import React from 'react'
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { MdDelete } from 'react-icons/md';
import Image from 'next/image';
import { fetchProjects } from '@/lib/data';
import { deleteProjects } from '@/lib/action';
import { FiEdit } from 'react-icons/fi';
async function ProjectsPage({searchParams}) {
 
  const q =searchParams?.q || "";
  const page =searchParams?.page || 1;

  const {count , project} = await fetchProjects(q,page);

  return (
    <div className='w-full mt-2 p-4 bg-[#182237]'>
      <div className='flex justify-between items-center'>
        <Search placeholder='Searh For A Projects...'/>
        <div>
          <Link href={"/Dashboard/Projects/Add"} >
            <button className='flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black'>
              <span>Add new</span>
              <HiOutlineDocumentAdd size={20}/>
            </button>
          </Link>
        </div>
      </div>
      <table className='w-full mt-3'>
        <thead>
          <tr>
            <td className='p-3'>Title</td>
            {/* <td>Descripation</td> */}
            <td className='p-3'>Category</td>
            <td className='p-3'>Image</td>
            <td className='p-3'>Created At</td>
            <td className='flex justify-center p-3'>Action</td>
          </tr>

        </thead>
        <tbody>
          {
            project.map((project , index)=>(
              <tr key={index} className="border-b border-gray-700 last:border-none">
                <td className='p-3'>{project.title}</td>
                {/* <td className='overflow-hidden text-ellipsis whitespace-nowrap max-w-xs'>{project.desc}</td> */}
                <td className='p-3' >{project.category}</td>
                <td className='p-3'>
                <div className="relative w-96 h-44 m-5 p-3">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className='absolute w-full h-full'
                  />
                </div>
                </td>
                <td className='p-3'>{project.createdAt?.toString().slice(4,16)}</td>
                <td className='p-3'>
                  <div className='flex gap-x-2  items-center'>
                    <Link href={`/Dashboard/Projects/${project.id}`}  className='p-2 '>
                    <button className='flex items-center gap-x-3 '>
                    <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                    </button>
                    </Link>
                    <form action={deleteProjects}>
                      <input type="hidden" name="id" value={project.id}/>
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

export default ProjectsPage
