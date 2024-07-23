"use client"
import { updateReviwes } from '@/lib/action';
import Image from 'next/image';
import React, { useState } from 'react'

function EditPage({id,ReviwesData}) {
    const [formData, setFormData] = useState(ReviwesData);
    const [imgUrl, setImgUrl] = useState(ReviwesData.img);
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
    return (
        <div className='bg-[#182237] p-5 rounded-lg mt-5'>
          <form action={updateReviwes} className='form flex flex-col gap-y-3 justify-between'>
            <input type="hidden" name="id"  value={id}/>
            <div className='flex justify-between'>
              <input
                className='w-[45%]'
                name='username'
                type='text'
                placeholder='Username...'
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                className='w-[45%]'
                name='job'
                type='text'
                placeholder='Job...'
                value={formData.job}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              className='w-full'
              name='desc'
              placeholder='Description...'
              rows="5"
              value={formData.desc}
              onChange={handleChange}
              required
            />
            <input
              className='w-full'
              name='img'
              type='text'
              placeholder='Image URL...'
              value={imgUrl}
              onChange={(e)=>{setImgUrl(e.target.value)}}
            />
            {imgUrl && (
            <div className='relative w-32 h-20 mt-2'>
              <Image
                src={imgUrl}
                alt={formData.username}
                fill
                className='rounded-lg shadow-md absolute w-full h-full'
              />
            </div>
          )}
            <button className='self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
              Submit
            </button>
          </form>
        </div>
      );
}

export default EditPage
