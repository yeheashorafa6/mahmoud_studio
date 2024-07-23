import { fetchMotions } from '@/lib/data';
import Image from 'next/image';
import React from 'react';

async function MotionGraphicsDetalis({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, motions } = await fetchMotions(q, page);
// console.log(motions)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {motions.map((motionItem, index) => (
      motionItem.media.map((item, idx) => (
        <div key={idx} style={{ margin: '10px', flex: '0 0 50%' }}>
          {item.type === 'image' ? (
            <Image 
              src={item.url} 
              className='rounded-full m-2 w-full h-52' 
              width={100} 
              height={100} 
              alt='media' 
              priority 
            />
          ) : (
            <video 
              className=' m-2 w-full' 
              width={100} 
              height={100} 
              controls
            >
              <source src={item.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))
    ))}
  </div>
);}

export default MotionGraphicsDetalis;
