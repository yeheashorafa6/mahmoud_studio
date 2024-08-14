"use client";
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { category } from '../../../../../../data';
import Image from 'next/image';
import axios from 'axios';
import { updateLatestProject } from '@/lib/action';
import { EditLatestProjectsReducer, INIT_DATA } from './EditLatestProjectsReducer';

function EditLatestProjectPage({ project, id }) {
  const [state,dispatch] = useReducer(EditLatestProjectsReducer,INIT_DATA)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (project) {
      dispatch({ type: "INIT_Project", project });
    }
  }, [project]);

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      const newImageUrl = response.data.secure_url;
        handleChange('img', newImageUrl);
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!state) {
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
            defaultValue={state.title}
            onChange={(e)=>handleChange("title", e.target.value)}
          />
          <select
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='category'
            defaultValue={state.category}
            onChange={(e)=>handleChange("category",e.target.value)}
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
            type='hidden'
            id='img'
            name='img'
            value={state.img}
            onChange={(e) => handleChange('img', e.target.value)}
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
          {state.img && (
            <div className='relative w-96 h-44 mt-2'>
              <Image
                src={state.img}
                alt={state.title}
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
          defaultValue={state.desc}
          onChange={(e)=>handleChange("desc",e.target.value)}
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
