"use client";
import { addReviwes } from "@/lib/action";
import Image from "next/image";
import React, { useState } from "react";

function AddReviwesPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        action={addReviwes}
        className="form flex flex-col gap-y-3 justify-between"
      >
        <div className="flex justify-between">
          <input
            className="w-[45%]"
            name="username"
            type="text"
            placeholder="Username..."
          />
          <input
            className="w-[45%]"
            name="job"
            type="text"
            placeholder="Job..."
          />
        </div>
        <textarea
          className="w-full"
          name="desc"
          placeholder="Description..."
          rows="5"
        />
        <input
          className="w-full"
          name="img"
          type="text"
          placeholder="Image URL..."
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          value={imageUrl}
        />
        <div className="relative rounded-full">
          {imageUrl && (
            <div className="mt-5">
              <Image
                src={imageUrl}
                alt="Preview"
                width={70}
                height={70}
                className="rounded-full "
              />
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

export default AddReviwesPage;
