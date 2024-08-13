"use client";
import { addProject } from '@/lib/action';
import React, { useReducer, useState } from 'react';
import { categoryProjects } from '../../../../../data';
import Image from 'next/image';
import axios from 'axios';
import { AddReducer, INIT_DATA } from './AddReducer';

function AddPage() {
  const [state, dispatch] = useReducer(AddReducer, INIT_DATA);
  const [imageUrl, setImageUrl] = useState('');
  const [formInputs, setFormInputs] = useState({
    title: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_DATA", payload: { name, value } });
  };

  // Upload the image to Cloudinary
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
      setImageUrl(response.data.secure_url); // Save the URL from Cloudinary
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', formInputs.title);
    formData.append('category', formInputs.category);
    formData.append('img', imageUrl);
    formData.append('desc', formInputs.description);

    await addProject(formData); // Send data to the server
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form onSubmit={handleSubmit} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            type='text'
            name='title'
            placeholder='Title...'
            required
            value={formInputs.title}
            onChange={handleInputChange}
          />
          <select
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='category'
            required
            value={formInputs.category}
            onChange={handleInputChange}
          >
            <option value="">Choose Your Category</option>
            {categoryProjects.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <input
          className='w-[45%] p-2 rounded bg-gray-800 text-white'
          type='file'
          onChange={handleFileUpload}
          required
          name='img'
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
        <textarea
          className='w-full p-2 rounded bg-gray-800 text-white'
          placeholder='Description...'
          name='description'
          rows='11'
          required
          value={formInputs.description}
          onChange={handleInputChange}
        ></textarea>
        <button
          type='submit'
          className='w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3'
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AddPage;
