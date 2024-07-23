import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteService } from '@/lib/action';
import { fetchServices } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiViewList } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

async function OurServicePage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  const { count, services } = await fetchServices(q, page);

  return (
    <div className="w-full mt-2 p-4 bg-[#182237]">
      <div className="flex justify-between items-center">
        <Search placeholder="Search For A Service..." />
        <div>
          <Link href={"/Dashboard/OurService/Add"}>
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
            <td>Category</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Image</td>
            <td className="flex justify-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.id} className='mb-16'>
              <td className="">
                <span>{service.category}</span>
              </td>
              <td className="max-w-[200px] overflow-hidden text-sm leading-tight">
                <div className="line-clamp-2">{service.desc}</div>
              </td>
              <td>{service.createdAt?.toString().slice(4, 16)}</td>
              <td className='text-center'>
                <Image src={service.img} alt={service.category} width={60} height={60} priority/>
              </td>
              <td>
                <div  className="flex gap-x-2 justify-center items-center m-10">
                  <Link href={`/Dashboard/OurService/${service.id}`} className="p-2 bg-blue-900 rounded-full hover:bg-blue-900/50">
                    <button className="flex items-center gap-x-3">
                      <span>View</span>
                      <CiViewList />
                    </button>
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
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

export default OurServicePage;
