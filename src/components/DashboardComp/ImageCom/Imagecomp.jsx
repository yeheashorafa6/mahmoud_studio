"use client"
import React, { useState } from 'react'

function Imagecomp() {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
      } else {
        setFileName('لم يتم اختيار أي ملف');
      }
    };
  return (
    <div className=''>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="bg-[#151c2c] text-white p-5 rounded-3xl  cursor-pointer">
              Choose An Image
            </label>
            <span className='ml-3'>{fileName}</span>
          </div>
  )
}

export default Imagecomp
