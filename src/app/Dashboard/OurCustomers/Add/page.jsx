"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { addCoustome } from "@/lib/action";

function AddOurCustomersPage() {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

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
        setImageUrl(newImageUrl);
        // Update the hidden input to reflect the new image URL
        document.querySelector('input[name="img"]').value = newImageUrl;
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
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        action={addCoustome}
        className="form flex flex-col gap-y-3 justify-between"
      >
        <div className="flex justify-between">
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="title"
            placeholder="Title"
            required
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="link"
            placeholder="Link"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className='text-white mb-1' htmlFor='img'>Image</label>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            type="text"
            name="img"
            value={imageUrl}
            readOnly
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className='bg-blue-500 text-white p-2 rounded w-fit mt-2'
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={handleFileUpload}
            id="imgFile"
          />
          {imageUrl && (
            <div className="relative w-96 h-44 mt-2">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="rounded-lg shadow-md absolute w-full h-full"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded text-white hover:bg-blue-500 mt-3"
        >
          Add Slide
        </button>
      </form>
    </div>
  );
}

export default AddOurCustomersPage;
