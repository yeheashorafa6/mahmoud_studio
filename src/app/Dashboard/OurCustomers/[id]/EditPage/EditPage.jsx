"use client"
import { updateCoustome } from "@/lib/action";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function EditPage({ id, coustomeData }) {
  const [formInpus, setFormInpus] = useState({
    title: coustomeData.title,
    link: coustomeData.link,
  });
  const [imgUrl, setImgUrl] = useState(coustomeData.img);

  useEffect(() => {
    setFormInpus({
      title: coustomeData.title || "",
      link: coustomeData.link || "",
    });
  }, [coustomeData]);

  const handleChange = (e) => {
    setFormInpus({
      ...formInpus,
      [e.target.name]: e.target.value
    });
  };



  if (!formInpus) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <h1 className="text-white text-xl mb-4">Edit Our Coustomers</h1>
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
            defaultValue={formInpus.title}
            onChange={handleChange}
          />
          <input
            className="w-[45%] p-2 rounded bg-gray-800 text-white"
            type="text"
            name="link"
            value={formInpus.link}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            type="text"
            name="img"
            placeholder="Image URL"
            value={imgUrl}
            required
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <div className="relative w-96 h-44">
            {imgUrl && (
              <div className="mt-5">
                <Image
                  src={imgUrl}
                  alt="Preview"
                  fill
                  className="w-full h-full absolute "
                />
              </div>
            )}
          </div>
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

export default EditPage;
