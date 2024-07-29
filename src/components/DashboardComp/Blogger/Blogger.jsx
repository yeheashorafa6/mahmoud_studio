import React from 'react';
import Link from 'next/link';
import { MdVisibility } from 'react-icons/md';

function Blogger({ blogger }) {
  return (
    <Link href={`/Dashboard/Blogger`} className='bg-[#182237] hover:bg-[#182237]/50 cursor-pointer p-5 flex gap-x-3 rtl flex-col-reverse rounded-xl w-full'>
      <div className='flex flex-col gap-y-4 rtl:items-end'>
        <h1 className='text-primary '>The Latst Blogger publich</h1>
        <div className='justify-end flex'>
          <h1 className='text-xl font-bold  '>{blogger.title}</h1>
        </div>
        <p className='text-base justify-end flex'>{blogger.desc}</p>
        {/* Additional content or elements can be added here */}
      </div>
    </Link>
  );
}

export default Blogger;
