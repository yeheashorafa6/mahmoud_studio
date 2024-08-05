"use client"
import { addSlide } from '@/lib/action';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
function AddSlidePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageMobileURL, setImageMobileUrl] = useState('');
  const [title, setTitle] = useState('');

  // Upload the image to Cloudinary
  const handleFileUpload = async (event, setImageUrl) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di2do9rhy/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('img', imageUrl);
    formData.append('imgMobile', imageMobileURL);


    await addSlide(formData);  // Send data to the server
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='text'
            name='title'
            placeholder='Title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
            </div>
            <label htmlFor="img">Image</label>
          <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='file'
            onChange={(e) => handleFileUpload(e, setImageUrl)}
            required
            name='img'
            id='img'
          />
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
        <label htmlFor="imgMobile"> Image Mobile</label>
        <input
            className='w-full p-2 rounded bg-gray-800 text-white'
            type='file'
            onChange={(e) => handleFileUpload(e, setImageMobileUrl)}
            required
            name='imgMobile'
          />
        <div className='relative w-80 h-44'>
          {imageMobileURL && (
            <div className='mt-5'>
              <Image
                src={imageMobileURL}
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
