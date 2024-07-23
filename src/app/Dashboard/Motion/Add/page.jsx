"use client";
import React, { useState } from 'react';
import { addMotion } from '@/lib/action'; // تأكد من تحديث المسار الصحيح لدالة addMotion

const AddPage = () => {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState([{ type: '', url: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddMedia = () => {
    setMedia([...media, { type: '', url: '' }]);
  };

  const handleRemoveMedia = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
  };

  const handleMediaChange = (index, field, value) => {
    const newMedia = media.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setMedia(newMedia);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    media.forEach((item, index) => {
      formData.append(`media[${index}][type]`, item.type);
      formData.append(`media[${index}][url]`, item.url);
    });

    try {
      const result = await addMotion(formData);

      if (result.success) {
        setSuccess('Section added successfully');
        // إعادة التوجيه إلى الصفحة المطلوبة
        window.location.href = result.redirect;
      }
    } catch (error) {
      setError('Error adding section');
      console.error('Error adding section:', error);
    }
  };

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <h1 className="text-2xl font-bold mb-4 text-white">Add New Section</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className='form flex flex-col gap-y-3'>
        <input 
          className='w-full p-2 mb-3 border border-gray-300 rounded-md' 
          name='title' 
          type='text' 
          placeholder='Title...' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        {media.map((item, index) => (
          <div key={index} className='flex justify-between items-center mb-3'>
            <select 
              className='w-1/3 p-2 border bg-black border-gray-300 rounded-md' 
              name={`media[${index}][type]`} 
              value={item.type} 
              onChange={(e) => handleMediaChange(index, 'type', e.target.value)}
              required
            >
              <option value=''>Select Type</option>
              <option value='image'>Image</option>
              <option value='video'>Video</option>
            </select>
            <input 
              className='w-2/3 p-2 border border-gray-300 rounded-md ml-2' 
              name={`media[${index}][url]`} 
              type='text' 
              placeholder='URL...' 
              value={item.url} 
              onChange={(e) => handleMediaChange(index, 'url', e.target.value)} 
              required 
            />
            <button 
              type='button' 
              className='p-2 bg-red-500 text-white rounded-md ml-2' 
              onClick={() => handleRemoveMedia(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type='button' 
          className='w-full p-2 mb-3 bg-blue-500 text-white rounded-md' 
          onClick={handleAddMedia}
        >
          Add Media
        </button>
        <button 
          type='submit' 
          className='w-full p-2 bg-green-500 text-white rounded-md'
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddPage;
