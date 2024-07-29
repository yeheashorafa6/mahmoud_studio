"use client";
import React, { useEffect, useState, useRef } from 'react';
import { category } from '../../../../../../data';
import Image from 'next/image';
import axios from 'axios';
import { updateLatestProject } from '@/lib/action';

function EditLatestProjectPage({ project, id }) {
  const [projects, setProjects] = useState(project);
  const [imgUrl, setImgUrl] = useState(project.img);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (project) {
      setProjects(project);
      setImgUrl(project.img);
    }
  }, [project]);

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
        document.querySelector('input[name="img"]').value = newImageUrl;
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjects({
      ...projects,
      [name]: value,
    });
  };

  if (!projects) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={updateLatestProject} className='form flex flex-col gap-y-3 justify-between'>
        <input type="hidden" name="id" value={id} />
        <div className='flex justify-between'>
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='title'
            type='text'
            defaultValue={projects.title}
            onChange={handleInputChange}
          />
          <select
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='category'
            defaultValue={projects.category}
            onChange={handleInputChange}
          >
            {category.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image URL</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            value={imgUrl}
            onChange={handleInputChange}
            required
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
                alt={projects.title}
                fill
                className='absolute w-full h-full object-cover'
              />
            </div>
          )}
        </div>
        <textarea
          className='p-2 rounded bg-gray-800 text-white'
          placeholder='Description...'
          name='desc'
          rows="11"
          defaultValue={projects.desc}
          onChange={handleInputChange}
        ></textarea>
        <button
          type='submit'
          className='bg-blue-600 p-3 rounded text-white hover:bg-blue-500'
        >
          Save Project
        </button>
      </form>
    </div>
  );
}

export default EditLatestProjectPage;
