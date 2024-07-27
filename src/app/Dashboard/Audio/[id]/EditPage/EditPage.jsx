"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { updateAudios } from '@/lib/action';

function EditPage({ id, audioData }) {
  const [formData, setFormData] = useState(audioData);
  const [audioUrl, setAudioUrl] = useState(audioData.audio);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (audioData) {
      setFormData(audioData);
      setAudioUrl(audioData.audio);
    }
  }, [audioData]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_audio'); // استخدم اسم الـ upload_preset الخاص بك
      formData.append('folder', 'studio/audio'); // تحديد المجلد الذي سيتم الرفع إليه

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/auto/upload', formData);
        const newAudioUrl = response.data.secure_url;
        setAudioUrl(newAudioUrl);
        document.querySelector('input[name="audio"]').value = newAudioUrl;
      } catch (error) {
        console.error('Error uploading the audio', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form action={updateAudios} className="form flex flex-col gap-y-3">
        <input type="hidden" name="id" value={id} />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          name="title"
          type="text"
          placeholder="Title..."
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          name="tag"
          type="text"
          placeholder="Tag..."
          value={formData.tag}
          onChange={handleInputChange}
        />
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="audio">Audio URL</label>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="text"
            id="audio"
            name="audio"
            value={audioUrl}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-blue-500 text-white p-2 rounded w-fit mt-2"
          >
            Change Audio
          </button>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={handleFileUpload}
            id="audioFile"
            accept="audio/*"
          />
          {audioUrl && (
            <div className="mt-5">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
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
