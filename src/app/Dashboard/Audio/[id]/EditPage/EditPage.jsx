"use client";
import React, { useEffect, useRef, useReducer } from 'react';
import axios from 'axios';
import { updateAudios } from '@/lib/action';
import { EditAudioReducer, INIT_DATA } from './EditAudioReducer';

function EditPage({ id, audioData }) {
  const [state, dispatch] = useReducer(EditAudioReducer, INIT_DATA)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (audioData) {
      dispatch({ type: "INIT_AUDIO", audioData })
    }
  }, [audioData]);

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value })
  }

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'upload_audio');
      formData.append('folder', 'studio/audio');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/di2do9rhy/auto/upload', formData);
        const newAudioUrl = response.data.secure_url;
        handleChange("audio", newAudioUrl)
      } catch (error) {
        console.error('Error uploading the audio', error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (!state) {
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
          value={state.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          name="tag"
          type="text"
          placeholder="Tag..."
          value={state.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
        />
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="audio">Audio </label>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="text"
            id="audio"
            name="audio"
            value={state.audio}
            onChange={(e) => handleChange("audio", e.target.value)}
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
          {state.audio && (
            <div className="mt-5">
              <audio key={state.audio} controls className="w-full">
                <source src={state.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
        <button className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">
          Save Audio
        </button>
      </form>
    </div>
  );
}

export default EditPage;