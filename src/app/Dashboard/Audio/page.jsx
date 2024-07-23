import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteAudio } from '@/lib/action';
import { fetchAudios } from '@/lib/data';
import Link from 'next/link';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

async function AudioPage({searchParams}) {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
  
    const { counts, audios } = await fetchAudios(q, page);
    // console.log(users);
    return (
        <div className="w-full mt-2 p-4 bg-[#182237]">
          <div className="flex justify-between items-center">
            <Search placeholder="Searh For A Project..." />
            <div>
              <Link href={"/Dashboard/Audio/Add"}>
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
                <td>Tag</td>
                <td>Created At</td>
                {/* <td>Audio</td> */}
                <td className="">Action</td>
              </tr>
            </thead>
            <tbody>
              {audios.map((audioo, index) => (
                <tr key={index}>
                  <td className="m-3">{audioo.title}</td>
                  <td className="">
                    {audioo.tag}
                  </td>
                  <td>{audioo.createdAt?.toString().slice(4, 16)}</td>
                  {/* <td>
                          {audioo.audio && (
                              <audio controls className="w-full">
                                  <source src={audioo.audio} type="audio/mpeg" />
                                  Your browser does not support the audio element.
                              </audio>
                          )}
                    </td> */}
                  <td>
                    <div className="flex gap-x-2  items-center">
                      <Link
                        href={`/Dashboard/Audio/${audioo.id}`}
                        className="p-2 m-3 bg-blue-900 rounded-full hover:bg-blue-900/50"
                      >
                        <button className="flex items-center gap-x-3 ">
                          <span>View</span>
                          <CiViewList />
                        </button>
                      </Link>
                      <form action={deleteAudio}>
                        <input type="hidden" name="id" value={audioo.id} />
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
          <Pagination count={counts} />
          {/* </div> */}
        </div>
      );
}

export default AudioPage
