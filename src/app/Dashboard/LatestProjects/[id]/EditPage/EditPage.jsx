"use client"
import { updateLatestProject } from '@/lib/action';
import React, { useEffect, useState } from 'react'
import { category } from '../../../../../../data';
import Image from 'next/image';

function EditLatestProjectPage({id,initData}) {
    const [slide, setSlide] = useState(initData);
  const [imgUrl, setImgUrl] = useState(initData.img);

  useEffect(() => {
    if (initData) {
      setSlide(initData);
      setImgUrl(initData.img);
    }
  }, [initData]);

  const handleImgChange = (e) => {
    setImgUrl(e.target.value);
  };
  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
    <form action={updateLatestProject} className='form flex flex-col gap-y-3 justify-between'>
      <input type="hidden" name="id" value={id} />
      <div className='flex justify-between'>
        <input className='w-[45%]' name='title' type='text' defaultValue={slide.title}/>
        <select className='w-[45%]' name='category' defaultValue={slide.category}>
        {
            category.map((category,index)=>(
              <option key={index} value={category.name}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image URL</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            defaultValue={slide.img}
            onChange={handleImgChange}
            required
          />
          {imgUrl && (
            <div className='relative w-96 h-44 mt-2'>
              <Image
                src={imgUrl}
                alt={slide.title}
                fill
                className='absolute w-full h-full '
              />
            </div>
          )}
        </div>
      <textarea placeholder='Description...' name='desc' rows={"11"} defaultValue={slide.desc} ></textarea>
      <button >Update</button>
    </form>
</div>
  )
}

export default EditLatestProjectPage
