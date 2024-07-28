"use client";
import React, { useState } from 'react';
import { addMotion } from '@/lib/action';
import axios from 'axios';

function AddMotionPage ()  {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState([]);

  const handleAddMedia = () => {
    setMedia([...media, { type: '', file: null, url: '' }]);
  };

  const handleRemoveMedia = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
  };

  const handleMediaTypeChange = (index, value) => {
    const newMedia = [...media];
    newMedia[index].type = value;
    setMedia(newMedia);
  };

  const handleFileUpload = async (index, event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'upload_preset');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/di2do9rhy/${file.type.startsWith('video') ? 'video' : 'image'}/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(percentCompleted);
          // يمكنك هنا تحديث حالة التقدم في واجهة المستخدم
        }
      }
    );
    
    const newMedia = [...media];
    newMedia[index] = {
      ...newMedia[index],
      url: response.data.secure_url,
      file: file
    };
    setMedia(newMedia);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

  const handleSubmit = async () => {
    // setError('');
    // setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    
    const validMedia = media.filter(item => item.type && item.url);
    formData.append('media', JSON.stringify(validMedia));

    try {
      await addMotion(formData);
     
    } catch (error) {
      console.error('Error adding section:', error);
      // setError('Error adding section: ' + error.message);
    } 
  };

  console.log(media)

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <h1 className="text-2xl font-bold mb-4 text-white">Add New Motion</h1>
      {/* {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>} */}
      <form action={handleSubmit} className='flex flex-col gap-y-4'>
        <input 
          className='w-full p-3 border border-gray-600 rounded-md bg-[#151c2c] text-white'
          type='text' 
          placeholder='Title...' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        {media.map((item, index) => (
          <div key={index} className='flex flex-col gap-y-2'>
            <div className='flex gap-x-2'>
              <select 
                className='w-1/3 p-3 border border-gray-600 rounded-md bg-[#151c2c] text-white'
                value={item.type} 
                onChange={(e) => handleMediaTypeChange(index, e.target.value)}
                required
              >
                <option value=''>Select Type</option>
                <option value='image'>Image</option>
                <option value='video'>Video</option>
              </select>
              <input 
                className='w-2/3 p-3 border border-gray-600 rounded-md bg-[#151c2c] text-white'
                type='file' 
                accept={item.type === 'video' ? 'video/*' : 'image/*'}
                onChange={(e) => handleFileUpload(index, e)}
                required 
              />
            </div>
            {
            item.url && (
              <div className='flex items-center gap-x-2'>
                <span className='text-white'>File uploaded:</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className='text-blue-400 underline'>
                  {item.file?.name || 'View file'}
                </a>
                {/* {item} */}
              </div>
              
            )}
            <button 
              type='button' 
              className='self-end p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
              onClick={() => handleRemoveMedia(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type='button' 
          className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
          onClick={handleAddMedia}
        >
          Add Media
        </button>
        <button 
          type='submit' 
          className='w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddMotionPage;