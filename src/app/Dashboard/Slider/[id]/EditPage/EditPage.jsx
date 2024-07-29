"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { updateSlide } from '@/lib/action';

function EditSlidePage({ id, initialData }) {
  const [slide, setSlide] = useState(initialData);
  const [imageUrl, setImageUrl] = useState(initialData.img);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setSlide(initialData);
      setImageUrl(initialData.img);
    }
  }, [initialData]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/di2do9rhy/image/upload',
          formData
        );
        const newImageUrl = response.data.secure_url;
        setImageUrl(newImageUrl);
        document.querySelector('input[name="img"]').value = newImageUrl;
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!slide) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjects({
      ...projects,
      [name]: value,
    });
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <h1 className='text-white text-xl mb-4'>Edit Slide</h1>
      <form action={updateSlide} className='flex flex-col gap-y-3'>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="img" value={imageUrl} />
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='title'>Title</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='title'
            name='title'
            required
            defaultValue={slide.title}
          />
        </div>
        <div className='flex flex-col mb-4'>
        <label className='text-white mb-1' htmlFor='img'>Image URL</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            value={imageUrl}
            onChange={handleInputChange}
            required
          />
          <div className='relative w-96 h-44 mb-2'>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt='Preview'
                fill
                className='w-full h-full absolute object-cover'
              />
            )}
          </div>
          <button
            type="button"
            onClick={triggerFileInput}
            className='bg-blue-500 text-white p-2 rounded w-fit'
          >
            Change Image
          </button>
          <input
            ref={fileInputRef}
            className='hidden'
            type='file'
            onChange={handleFileUpload}
            id='img'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 p-3 rounded text-white hover:bg-blue-500'
        >
          Save Slide
        </button>
      </form>
    </div>
  );
}

export default EditSlidePage;