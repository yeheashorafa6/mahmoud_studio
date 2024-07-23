import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import Link from 'next/link';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { ProductsDashboard } from '../../../../data';
import Image from 'next/image';
import { fetchProjects } from '@/lib/data';
import { deleteProjects } from '@/lib/action';
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
            project.map((project , index)=>(
              <tr key={index}>
                <td className=''>{project.title}</td>
                {/* <td className='overflow-hidden text-ellipsis whitespace-nowrap max-w-xs'>{project.desc}</td> */}
                <td >{project.category}</td>
                <td>
                <div className="relative w-96 h-44 m-5">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className='absolute w-full h-full'
                  />
                </div>
                </td>
                <td>{project.createdAt?.toString().slice(4,16)}</td>
                <td>
                  <div className='flex gap-x-2  items-center'>
                    <Link href={`/Dashboard/Projects/${project.id}`}  className='p-2 bg-blue-900 rounded-full hover:bg-blue-900/50'>
                    <button className='flex items-center gap-x-3 '>
                      <span>View</span>
                      <CiViewList/>
                    </button>
                    </Link>
                    <form action={deleteProjects}>
                      <input type="hidden" name="id" value={project.id}/>
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

export default ProjectsPage
