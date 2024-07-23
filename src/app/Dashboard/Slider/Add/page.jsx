"use client"
import { addSlide } from '@/lib/action';
import Image from 'next/image';
import React, { useState } from 'react';

function AddSlidePage() {
  const [imageUrl, setImageUrl] = useState('');


  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={addSlide} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input className='w-[45%] p-2 rounded bg-gray-800 text-white' type='text' name='title' placeholder='Title' required />
          <input className='w-[45%] p-2 rounded bg-gray-800 text-white' type='text' name='img' placeholder='Image URL' value={imageUrl} required onChange={(e)=>setImageUrl(e.target.value)}/>
        </div>
        <div className='relative w-96 h-44'>
        {imageUrl && (
        <div className='mt-5'>
          <Image src={imageUrl} alt='Preview' fill className='w-full h-full absolute ' />
        </div>
      )}
        </div>
        <button type='submit' className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'>
          Add Slide
        </button>
      </form>
    </div>
  );
}

export default AddSlidePage;
