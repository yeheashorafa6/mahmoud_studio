"use client";
import React, { useEffect, useRef, useReducer } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { updateReviwes } from '@/lib/action';
import { EditReviweReducer, INIT_DATA } from './EditReviweReducer';

function EditPage({ id, reviwes }) {
  const [state,dispatch] = useReducer(EditReviweReducer,INIT_DATA)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (reviwes) {
      dispatch({type: "INIT_REVIWE",reviwes})
    }
  }, [reviwes]);

  const handleChange = (field , value) =>{
    dispatch({type : "SET_FIELD" , field, value})
  }

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
        handleChange("img",newImageUrl);
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
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
            value={state.username}
            onChange={(e)=>handleChange("username",e.target.value)}
            required
          />
          <input
            className='w-[45%] p-2 rounded bg-gray-800 text-white'
            name='job'
            type='text'
            placeholder='Job...'
            value={state.job}
            onChange={(e)=>handleChange("job",e.target.value)}
            required
          />
        </div>
        <textarea
          className='w-full p-2 rounded bg-gray-800 text-white'
          name='desc'
          placeholder='Description...'
          rows="5"
          value={state.desc}
          onChange={(e)=>handleChange("desc",e.target.value)}
          required
        />
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='hidden'
            id='img'
            name='img'
            value={state.img}
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
          {state.img && (
            <div className='relative w-32 h-20 mt-2'>
              <Image
                src={state.img}
                alt={state.username}
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
