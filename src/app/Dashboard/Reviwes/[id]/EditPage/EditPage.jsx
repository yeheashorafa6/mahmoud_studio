"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { updateReviwes } from '@/lib/action';

function EditPage({ id, ReviwesData }) {
  const [formData, setFormData] = useState(ReviwesData);
  const [imgUrl, setImgUrl] = useState(ReviwesData.img);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (ReviwesData) {
      setFormData(ReviwesData);
      setImgUrl(ReviwesData.img);
    }
  }, [ReviwesData]);

  // Upload the image to Cloudinary
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
        const newImageUrl = response.data.secure_url;
        setImgUrl(newImageUrl);
        // Update the formData to reflect the new image URL
        setFormData({ ...formData, img: newImageUrl });
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={updateReviwes} className='form flex flex-col gap-y-3 justify-between'>
        <input type="hidden" name="id" value={id} />
        <div className='flex justify-between'>
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='username'
            type='text'
            placeholder='Username...'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='job'
            type='text'
            placeholder='Job...'
            value={formData.job}
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          className='w-full p-2 rounded bg-gray-800 text-white'
          name='desc'
          placeholder='Description...'
          rows="5"
          value={formData.desc}
          onChange={handleChange}
          required
        />
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            value={imgUrl}
            readOnly
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
            <div className='relative w-32 h-20 mt-2'>
              <Image
                src={imgUrl}
                alt={formData.username}
                fill
                className='rounded-lg shadow-md absolute w-full h-full'
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='bg-blue-600 p-3 rounded text-white hover:bg-blue-500'
        >
          Save Reviwe
        </button>
      </form>
    </div>
  );
}

export default EditPage;
