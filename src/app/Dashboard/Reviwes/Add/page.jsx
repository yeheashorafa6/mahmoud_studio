"use client";
import React, { useState } from "react";
import axios from "axios";
import { addReviwes } from "@/lib/action";
import Image from "next/image";

function AddReviwesPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [formInputs, setFormInputs] = useState({
    username: "",
    job: "",
    desc: "",
  });

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
    formData.append('username', formInputs.username);
    formData.append('job', formInputs.job);
    formData.append('desc', formInputs.desc);
    formData.append('img', imageUrl);

    await addReviwes(formData); // Send data to the server
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
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form onSubmit={handleSubmit} className="form flex flex-col gap-y-3 justify-between">
        <div className="flex justify-between">
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            name="username"
            type="text"
            placeholder="Username..."
            value={formInputs.username}
            onChange={handleInputChange}
            required
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            name="job"
            type="text"
            placeholder="Job..."
            value={formInputs.job}
            onChange={handleInputChange}
            required
          />
        </div>
        <textarea
          className="w-full p-2 rounded bg-gray-800 text-white"
          name="desc"
          placeholder="Description..."
          rows="5"
          value={formInputs.desc}
          onChange={handleInputChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="file"
          onChange={handleFileUpload}
          required
        />
        <div className="relative w-20 h-20 mt-5">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="absolute w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Reviwes 
        </button>
      </form>
    </div>
  );
}

export default AddReviwesPage;
