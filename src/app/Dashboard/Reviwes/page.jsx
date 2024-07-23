import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteReviwes } from '@/lib/action';
import { fetchReviwes } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

async function ReviwesPage({searchParams}) {

    const q =searchParams?.q || "";
    const page =searchParams?.page || 1;
  
    const {count , reviews} = await fetchReviwes(q,page);

    return (
        <div className="w-full mt-2 p-4 bg-[#182237]">
          <div className="flex justify-between items-center">
            <Search placeholder="Searh For A Reviwes..." />
            <div>
              <Link href={"/Dashboard/Reviwes/Add"}>
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
                <td>username</td>
                <td>Job</td>
                <td>Created At</td>
                {/* <td>desc</td> */}
                <td className="flex justify-center">Action</td>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review.id}>
                  <td className="flex items-center gap-x-3 p-3">
                    <div className='relative w-14 h-14'><Image src={review.img || "/assets/mh.png"} fill alt='mh'  className='absolute w-full h-full rounded-full' priority /></div>
                    <span>{review.username}</span>
                  </td>
                  <td>{review.job}</td>
                  <td>{review.createdAt?.toString().slice(4,16)}</td>
                  {/* <td className='w-10 line-clamp-1 '>{review.desc}</td> */}
                  <td>
                    <div className="flex gap-x-2 justify-center items-center">
                      <Link //${encodeURIComponent( user.username.replace(/\s+/g, "-").toLowerCase()
                        href={`/Dashboard/Reviwes/${review.id}`}
                        className="p-2 bg-blue-900 rounded-full hover:bg-blue-900/50"
                      >
                        <button className="flex items-center gap-x-3 ">
                          <span>View</span>
                          <CiViewList />
                        </button>
                      </Link>
                      <form action={deleteReviwes}>
                        <input type="hidden" name="id" value={review.id}/>
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
          {/* <div className='w-full flex justify-center'> */}
          <Pagination count={count}/>
          {/* </div> */}
        </div>
      );
}

export default ReviwesPage
