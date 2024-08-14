"use client";

import { useState, useEffect, useRef, useReducer } from "react";
import Image from "next/image";
import axios from "axios";
import { updateSlide } from "@/lib/action";
import { EditReducer, INIT_DATA } from "./EditReducer";

function EditSlidePage({ id, initialData }) {
  const [state, dispatch] = useReducer(EditReducer, INIT_DATA);

  const fileInputRefImg = useRef(null);
  const fileInputRefImgMobile = useRef(null);

  useEffect(() => {
    if (initialData) {
      dispatch({ type: "INIT_SLIDE", initialData });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/di2do9rhy/image/upload",
        formData
      );
      handleChange(field, response.data.secure_url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.title) {
      console.error("Please fill all the inputs");
      return;
    }

    const data = {
      id,
      ...state,
    };

    console.log("data : ", data);

    try {
      const result = await updateSlide(data);
      console.log("Slider updated successfully", result);
    } catch (error) {
      console.error("error in updated slider", error);
      // معالجة الخطأ بشكل مناسب (مثل إظهار رسالة خطأ للمستخدم)
    }
  };

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <h1 className="text-white text-xl mb-4">Edit Slide</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
        <input type="hidden" name="id" value={id} />
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="title">
            Title
          </label>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="text"
            id="title"
            name="title"
            required
            defaultValue={state.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="img">
            Image 
          </label>
          <input type="hidden" name="img" id="img" />
          <div className="relative w-full h-80 mb-2">
            {state.img && (
              <Image
                src={state.img}
                alt="Preview"
                fill
                className="w-full h-full absolute object-cover"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => triggerFileInput(fileInputRefImg)}
            className="bg-blue-500 text-white p-2 rounded w-fit"
          >
            Change Image
          </button>
          <input
            ref={fileInputRefImg}
            className="hidden"
            type="file"
            onChange={(e) => handleFileUpload(e, "img")}
            id="img"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-white mb-1" htmlFor="imgMobile">
            Image URL (Mobile)
          </label>
          <input type="hidden" name="imgMobile" id="imgMobile" />
          <div className="relative w-96 h-72 mb-2">
            {state.imgMobile && (
              <Image
                src={state.imgMobile}
                alt="Preview"
                fill
                className="w-full h-full absolute object-cover"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => triggerFileInput(fileInputRefImgMobile)}
            className="bg-blue-500 text-white p-2 rounded w-fit"
          >
            Change Mobile Image
          </button>
          <input
            ref={fileInputRefImgMobile}
            className="hidden"
            type="file"
            onChange={(e) => handleFileUpload(e, "imgMobile")}
            id="imgMobile"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 p-3 rounded text-white hover:bg-blue-500"
        >
          Save Slide
        </button>
      </form>
    </div>
  );
}

export default EditSlidePage;
