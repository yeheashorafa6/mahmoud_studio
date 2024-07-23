"use client"
import { addProject } from '@/lib/action';
import React, { useState } from 'react'
import { category } from '../../../../../data';
import Image from 'next/image';

function AddPage() {
  const [imageUrl,setImageUrl] = useState('')
  
  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
        <form action={addProject} className='form flex flex-col gap-y-3 justify-between'>
          <div className='flex justify-between'>
            <input className='w-[45%]' name='title' type='text' placeholder='Title...'/>
            <select className='w-[45%]' name='category'>
            <option value="general">Choose Your Category</option>
            {
                category.map((category,index)=>(
                  <option key={index} value={category.name}>{category.name}</option>
                ))
              }
            </select>
          </div>
          <input
          className="w-[45%] p-2 rounded bg-gray-800 text-white"
          type="text"
          name="img"
          placeholder="Image URL"
          value={imageUrl}
          required
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className="relative w-96 h-44">
          {imageUrl && (
            <div className="mt-5">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="w-full h-full absolute "
              />
            </div>
          )}
        </div>
          <textarea placeholder='Description...' name='desc' rows={"11"}></textarea>
          <button >Submit</button>
        </form>
    </div>
  )
}

export default AddPage
