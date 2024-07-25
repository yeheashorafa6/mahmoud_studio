"use client";

import React, { useState, useCallback, useMemo } from "react";
import { updateMotion } from "@/lib/action";
import Image from "next/image";

const EditPage = ({ id, initialData }) => {
  const [title, setTitle] = useState(initialData.title);
  const [media, setMedia] = useState(initialData.media);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleAddMedia = useCallback(() => {
    setMedia(prevMedia => [...prevMedia, { type: "", url: "" }]);
  }, []);

  const handleRemoveMedia = useCallback((index) => {
    setMedia(prevMedia => prevMedia.filter((_, i) => i !== index));
  }, []);

  const handleMediaChange = useCallback((index, field, value) => {
    setMedia(prevMedia => prevMedia.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("media", JSON.stringify(media));

    try {
      const result = await updateMotion(formData);
      if (!result.ok) {
        throw new Error("Failed to update motion");
      }
      setSuccess("Motion updated successfully");
    } catch (error) {
      setError("Error updating motion");
      console.error("Error updating motion:", error);
    }
  }, [id, title, media]);

  const mediaInputs = useMemo(() => media.map((item, index) => (
    <div key={index} className="flex justify-between items-center mb-3">
      <select
        className="w-1/3 p-2 border bg-black border-gray-300 rounded-md"
        value={item.type}
        onChange={(e) => handleMediaChange(index, "type", e.target.value)}
        required
      >
        <option value="">Select Type</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input
        className="w-2/3 p-2 border border-gray-300 rounded-md ml-2"
        type="text"
        placeholder="URL..."
        value={item.url}
        onChange={(e) => handleMediaChange(index, "url", e.target.value)}
        required
      />
      <div>
      {
        item.url && 
        <Image src={item.url} alt="img" width={70} height={70} priority/>
      }
      </div>
      <button
        type="button"
        className="p-2 bg-red-500 text-white rounded-md ml-2"
        onClick={() => handleRemoveMedia(index)}
      >
        Remove
      </button>
    </div>
  )), [media, handleMediaChange, handleRemoveMedia]);

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Motion</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="form flex flex-col gap-y-3">
        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={handleTitleChange}
          required
        />
        {mediaInputs}
        <button
          type="button"
          className="w-full p-2 mb-3 bg-blue-500 text-white rounded-md"
          onClick={handleAddMedia}
        >
          Add Media
        </button>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPage;