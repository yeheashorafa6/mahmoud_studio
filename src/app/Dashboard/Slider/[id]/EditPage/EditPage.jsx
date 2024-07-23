"use client"
import { updateSlide } from '@/lib/action';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function EditSlidePage({ id, initialData }) {
  const [slide, setSlide] = useState(initialData);
  const [imgUrl, setImgUrl] = useState(initialData.img);

  useEffect(() => {
    if (initialData) {
      setSlide(initialData);
      setImgUrl(initialData.img);
    }
  }, [initialData]);

  const handleImgChange = (e) => {
    setImgUrl(e.target.value);
  };

  if (!slide) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <h1 className='text-white text-xl mb-4'>Edit Slide</h1>
      <form action={updateSlide} className='flex flex-col gap-y-3'>
        <input type="hidden" name="id" value={id} />
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='title'>Title</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='title'
            name='title'
            required
            defaultValue={slide.title}
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image URL</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            defaultValue={slide.img}
            onChange={handleImgChange}
            required
          />
          {imgUrl && (
            <div className='relative w-32 h-20 mt-2'>
              <Image
                src={imgUrl}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                className='rounded-lg shadow-md'
              />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='bg-blue-600 p-3 rounded text-white hover:bg-blue-500'
        >
          Update Slide
        </button>
      </form>
    </div>
  );
}

export default EditSlidePage;
