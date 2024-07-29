"use client";
import React, { useState, useCallback, useRef } from "react";
import { updateMotion } from "@/lib/action";
import Image from "next/image";
import axios from 'axios';

const EditPage = ({ id, initialData }) => {
  const [title, setTitle] = useState(initialData.title);
  const [media, setMedia] = useState(initialData.media);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRefs = useRef([]);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleAddMedia = useCallback(() => {
    setMedia(prevMedia => [...prevMedia, { type: "", file: null, url: "" }]);
  }, []);

  const handleRemoveMedia = useCallback((index) => {
    setMedia(prevMedia => prevMedia.filter((_, i) => i !== index));
  }, []);

  const handleMediaTypeChange = useCallback((index, value) => {
    setMedia(prevMedia => prevMedia.map((item, i) =>
      i === index ? { ...item, type: value } : item
    ));
  }, []);

  const handleFileUpload = useCallback(async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset'); // استبدل بـ upload preset الخاص بك

    try {
      const uploadType = file.type.startsWith('video') ? 'video' : 'image';
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/di2do9rhy/${uploadType}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        }
      );

      setMedia(prevMedia => prevMedia.map((item, i) =>
        i === index ? { ...item, url: response.data.secure_url, file: file } : item
      ));
    } catch (error) {
      setError('Error uploading file');
      console.error('Error uploading file:', error.response ? error.response.data : error);
    }
  }, []);

  const triggerFileInput = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleSubmit = useCallback(async () => {
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("media", JSON.stringify(media));
    try {
      await updateMotion(formData);
      setSuccess("Motion updated successfully!");
    } catch (error) {
      setError("Error updating motion");
      console.error("Error updating motion:", error);
    }
  }, [id, title, media]);

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Motion</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}
      <form action={handleSubmit} className="flex flex-col gap-y-4">
        <input
          className="w-full p-3 border border-gray-600 rounded-md bg-[#151c2c] text-white"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={handleTitleChange}
          required
        />
        {media.map((item, index) => (
          <div key={index} className="flex flex-col gap-y-2 mb-3">
            <div className="flex gap-x-2">
              <select
                className="w-1/3 p-2 border bg-[#151c2c] border-gray-600 rounded-md text-white"
                value={item.type}
                onChange={(e) => handleMediaTypeChange(index, e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <input
                ref={(el) => (fileInputRefs.current[index] = el)}
                className="hidden"
                type="file"
                accept={item.type === 'video' ? 'video/*' : 'image/*'}
                onChange={(e) => handleFileUpload(index, e)}
              />
              <button
                type="button"
                onClick={() => triggerFileInput(index)}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                {item.url ? 'Change File' : 'Upload File'}
              </button>
            </div>
            {item.url && (
              <div className="flex items-center gap-x-2">
                <span className="text-white">File uploaded:</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  {item.file?.name || 'View file'}
                </a>
              </div>
            )}
            <button
              type="button"
              className="self-end p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => handleRemoveMedia(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleAddMedia}
        >
          Add Media
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Save Motion
        </button>
      </form>
    </div>
  );
};

export default EditPage;
