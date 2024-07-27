"use client";
import React, { useState, useEffect, useRef } from 'react';
import { category as categories } from '../../../../../../data';
import Image from 'next/image';
import axios from 'axios';
import { updateService } from '@/lib/action';

function EditPage({ service, id }) {
  const [formData, setFormData] = useState({
    category: service.category || '',
    desc: service.desc || '',
  });
  const [imgUrl, setImgUrl] = useState(service.img || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (service) {
      setFormData({
        category: service.category || '',
        desc: service.desc || '',
      });
      setImgUrl(service.img || '');
    }
  }, [service]);

  // Handle file upload to Cloudinary
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
        const newImageUrl = response.data.secure_url;
        setImgUrl(newImageUrl);
        // Optionally, you can set the URL to an input field if needed
        document.querySelector('input[name="img"]').value = newImageUrl;
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  // Trigger the file input click event
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
          <label className="block text-sm font-medium text-gray-300">Image</label>
          <input
            type="text"
            name="img"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="mt-1 block p-5 w-full rounded-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Image URL..."
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className='bg-blue-500 text-white p-2 rounded w-fit mt-2'
          >
            Change Image
          </button>
          <input
            ref={fileInputRef}
            className='hidden'
            type='file'
            onChange={handleFileUpload}
            id='imgFile'
          />
          {imgUrl && (
            <div className='relative w-96 h-44 mt-2'>
              <Image
                src={imgUrl}
                alt="Image Preview"
                fill
                className='absolute w-full h-full object-cover rounded-md'
              />
            </div>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-600 p-3 rounded text-white hover:bg-blue-500'
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPage;
