"use client"
import { addSlide } from '@/lib/action';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
function AddSlidePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  // Upload the image to Cloudinary
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      setImageUrl(response.data.secure_url); // Save the URL from Cloudinary
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('img', imageUrl);

    await addSlide(formData);  // Send data to the server
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            type='text'
            name='title'
            placeholder='Title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            type='file'
            onChange={handleFileUpload}
            required
            name='img'
          />
        </div>
        <div className='relative w-96 h-44'>
          {imageUrl && (
            <div className='mt-5'>
              <Image
                src={imageUrl}
                alt='Preview'
                fill
                className='w-full h-full absolute'
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'
        >
          Add Slide
        </button>
      </form>
    </div>
  );
}

export default AddSlidePage;
