import Pagination from '@/components/DashboardComp/Pagination/Pagination';
import Search from '@/components/DashboardComp/Search/Search';
import { deleteService } from '@/lib/action';
import { fetchServices } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete ,MdMedicalServices } from 'react-icons/md';

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
              <MdMedicalServices size={20} />
            </button>
          </Link>
        </div>
      </div>
      <table className="w-full mt-3">
        <thead>
          <tr>
            <td className='p-3'>Category</td>
            <td className='p-3'>Description</td>
            <td className='p-3'>Created At</td>
            <td className='p-3'>Image</td>
            <td className="flex justify-center p-3">Action</td>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.id} className=' border-b border-gray-700 last:border-none'>
              <td className="p-3">
                <span>{service.category}</span>
              </td>
              <td className="p-3 max-w-[200px] overflow-hidden text-sm leading-tight">
                <div className="line-clamp-2">{service.desc}</div>
              </td>
              <td className='p-3'>{service.createdAt?.toString().slice(4, 16)}</td>
              <td className='text-center p-3'>
                <Image src={service.img} alt={service.category} width={60} height={60} priority/>
              </td>
              <td className='p-3'>
                <div  className="flex gap-x-2 justify-center items-center m-10">
                  <Link href={`/Dashboard/OurService/${service.id}`} className="p-2 ">
                    <button className="flex items-center gap-x-3">
                    <FiEdit
                          size={30}
                          className="text-teal-400 rounded-full hover:text-teal-100/50"
                        />
                    </button>
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
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
      <Pagination count={count} />
    </div>
  );
}

export default OurServicePage;
