import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteSlide } from '@/lib/action';
import { fetchSlides } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

async function SliderPage({ searchParams }) {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, slide } = await fetchSlides(q, page);

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center">
        <Search placeholder="Search For A Slide..." />
        <div>
          <Link href={"/Dashboard/Slider/Add"}>
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
            <td>Image</td>
            <td>Created At</td>
            <td className="flex justify-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {slide.map((slide, index) => (
            <tr key={slide.id}>
              <td className="flex items-center gap-x-3 p-3">
                <span>{slide.title}</span>
              </td>
              <td className="p-3">
                <div className="relative w-96 h-44 ">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className='absolute w-full h-full'
                  />
                </div>
              </td>
              <td>{slide.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className="flex gap-x-2 justify-center items-center">
                  <Link
                    href={`/Dashboard/Slider/${slide.id}`}
                    className="p-2 bg-blue-900 rounded-full hover:bg-blue-900/50"
                  >
                    <button className="flex items-center gap-x-3">
                      <span>View</span>
                      <CiViewList />
                    </button>
                  </Link>
                  <form action={deleteSlide}>
                    <input type="hidden" name="id" value={slide.id} />
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
      <Pagination count={count} />
    </div>
  );
}

export default SliderPage;
