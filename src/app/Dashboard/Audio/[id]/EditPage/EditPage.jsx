"use client";
import React, { useState } from 'react';
import { updateAudios } from '@/lib/action';

function EditPage({ id,audioData }) {

  const [formData, setFormData] = useState(audioData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form action={updateAudios} className="form flex flex-col gap-y-3">
        <input type="hidden" name="id" value={id} />
        <input
          className="w-full"
          name="title"
          type="text"
          placeholder="Title..."
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="w-full"
          name="tag"
          type="text"
          placeholder="Tag..."
          value={formData.tag}
          onChange={handleChange}
        />
        <input
          className="w-full"
          name="audio"
          type="text"
          placeholder="Audio URL..."
          value={formData.audio}
          onChange={handleChange}
        />
        <div className="relative">
          {formData.audio && (
            <div className="mt-5">
              <audio controls className="w-full">
                <source src={formData.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
        <button className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditPage;
