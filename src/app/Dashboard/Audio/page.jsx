import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteAudio } from '@/lib/action';
import { fetchAudios } from '@/lib/data';
import Link from 'next/link';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { SiAudiomack } from "react-icons/si";

async function AudioPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { counts, audios } = await fetchAudios(q, page);

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center">
        <Search placeholder="Search For An Audio..." />
        <div>
          <Link href={"/Dashboard/Audio/Add"}>
            <button className="flex items-center justify-center gap-x-2 bg-[#b7bac1] hover:bg-[#b7bac1]/50 p-3 rounded-full text-black">
              <span>Add new</span>
              <SiAudiomack size={20} />
            </button>
          </Link>
        </div>
      </div>
      <table className="w-full mt-3 ">
        <thead>
          <tr>
            <td className='p-3'>Title</td>
            <td className='p-3'>Tag</td>
            <td className='p-3'>Created At</td>
            <td className='p-3'>Audio</td>
            <td className="p-3 flex justify-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {audios.map((audioo, index) => (
            <tr key={index} className='border-b border-gray-700 last:border-none'>
              <td className="m-3 p-3">{audioo.title}</td>
              <td className='p-3'>{audioo.tag}</td>
              <td className='p-3'>{audioo.createdAt?.toString().slice(4, 16)}</td>
              <td className='p-3'>
                {audioo.audio && (
                  <div className="w-72 items-center  gap-2 p-2 rounded-md">
                    <audio controls className="w-full">
                      <source src={audioo.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </td>
              <td className='p-3'>
                <div className="flex gap-x-2 items-center">
                  <Link
                    href={`/Dashboard/Audio/${audioo.id}`}
                    className="p-2 m-3 "
                  >
                    <button className="flex items-center gap-x-3 ">
                    <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                    </button>
                  </Link>
                  <form action={deleteAudio}>
                    <input type="hidden" name="id" value={audioo.id} />
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
      <Pagination count={counts} />
    </div>
  );
}

export default AudioPage;
