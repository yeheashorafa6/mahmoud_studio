"use client";
import { addAudios } from "@/lib/action";
import React, { useState } from "react";

function AddAudioPage() {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    audio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        action={addAudios}
        method="POST"
        className="form flex flex-col gap-y-3 justify-between"
      >
        <div className="flex justify-between">
          <input
            className="w-[45%]"
            name="title"
            type="text"
            placeholder="Title..."
            value={formData.title}
            onChange={handleChange}
          />
          <input
            className="w-[45%]"
            name="tag"
            type="text"
            placeholder="Tag..."
            value={formData.tag}
            onChange={handleChange}
          />
        </div>
        <input
          className="w-full"
          name="audio"
          type="text"
          placeholder="Audio URL..."
          value={formData.audioUrl}
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
        <button className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddAudioPage;
