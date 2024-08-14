import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteReviwes } from '@/lib/action';
import { fetchReviwes } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { MessageSquare } from 'lucide-react';

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
                  <MessageSquare  />
                </button>
              </Link>
            </div>
          </div>
          <table className="w-full mt-3">
            <thead>
              <tr>
                <td className='p-3'>username</td>
                <td className='p-3'>Job</td>
                <td className='p-3'>Created At</td>
                {/* <td>desc</td> */}
                <td className="flex justify-center p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className='border-b border-gray-700 last:border-none'>
                  <td className="flex items-center gap-x-3 p-3">
                    <div className='relative w-14 h-14'><Image src={review.img || "/assets/mh.png"} fill alt='mh'  className='absolute w-full h-full rounded-full' priority /></div>
                    <span>{review.username}</span>
                  </td>
                  <td className='p-3'>{review.job}</td>
                  <td className='p-3'>{review.createdAt?.toString().slice(4,16)}</td>
                  {/* <td className='w-10 line-clamp-1 '>{review.desc}</td> */}
                  <td className='p-3'>
                    <div className="flex gap-x-2 justify-center items-center">
                      <Link //${encodeURIComponent( user.username.replace(/\s+/g, "-").toLowerCase()
                        href={`/Dashboard/Reviwes/${review.id}`}
                        className="p-2 "
                      >
                        <button className="flex items-center gap-x-3 ">
                        <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                        </button>
                      </Link>
                      <form action={deleteReviwes}>
                        <input type="hidden" name="id" value={review.id}/>
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

export default ReviwesPage
