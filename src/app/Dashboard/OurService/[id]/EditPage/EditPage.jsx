"use client";
import { updateService } from '@/lib/action';
import React, { useState, useEffect } from 'react';
import { category as categories} from '../../../../../../data';
import Image from 'next/image';
function EditPage({ id, service }) {
  const [formData, setFormData] = useState({
    category: service.category || '',
    desc: service.desc || '',
    img : service.img || ''
  });
  const [imgUrl, setImgUrl] = useState(service.img);


  useEffect(() => {
    setFormData({
      category: service.category || '',
      desc: service.desc || ''
    });
  }, [service]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={updateService} className='form flex flex-col gap-y-3 justify-between'>
        <input type="hidden" name="id" value={id} />
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Choose Your Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            name="desc"
            placeholder="Description..."
            rows="5"
            value={formData.desc}
            onChange={handleChange}
            className="mt-1 block w-full p-5 rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Image URL</label>
          <input
            type="text"
            name="img"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Image URL..."
          />
          {imgUrl &&
           <div className="relative w-44 h-44">
             <Image
              fill
              src={imgUrl}
              alt="Image Details Preview"
              className="mt-2 w-full h-full absolute rounded-md"
            />
           </div>}
        </div>

        <button type="submit" className='self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPage;
