"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { updateCoustome } from "@/lib/action";

function EditPage({ id, coustomeData }) {
  const [formInputs, setFormInputs] = useState({
    title: coustomeData.title,
    link: coustomeData.link,
  });
  const [imgUrl, setImgUrl] = useState(coustomeData.img);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormInputs({
      title: coustomeData.title || "",
      link: coustomeData.link || "",
    });
  }, [coustomeData]);

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_preset'); // Replace with your upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/image/upload', formData);
        const newImageUrl = response.data.secure_url;
        setImgUrl(newImageUrl);
        document.querySelector('input[name="img"]').value = newImageUrl;
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!formInputs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <h1 className="text-white text-xl mb-4">Edit Our Customers</h1>
      <form
        action={updateCoustome}
        className="form flex flex-col gap-y-3 justify-between"
      >
        <input type="hidden" name="id" value={id} />
        <div className="flex justify-between">
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="title"
            value={formInputs.title}
            onChange={handleChange}
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="link"
            value={formInputs.link}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="img">Image</label>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            type="text"
            name="img"
            value={imgUrl}
            readOnly
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-blue-500 text-white p-2 rounded w-fit mt-2"
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
          {imgUrl && (
            <div className="relative w-96 h-44 mt-2">
              <Image
                src={imgUrl}
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
          Update Slide
        </button>
      </form>
    </div>
  );
}

export default EditPage;
