"use client"
import React, { useEffect, useState } from 'react'
import { category } from '../../../../../../data';
import Image from 'next/image';
import { updateProject } from '@/lib/action';

function EditPage({project , id}) {
    const [projects, setProjects] = useState(project);
    const [imgUrl, setImgUrl] = useState(project.img);
  
    useEffect(() => {
      if (project) {
        setProjects(project);
        setImgUrl(project.img);
      }
    }, [project]);
  
    const handleImgChange = (e) => {
      setImgUrl(e.target.value);
    };
  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
    <form action={updateProject} className='form flex flex-col gap-y-3 justify-between'>
      <input type="hidden" name="id" value={id} />
      <div className='flex justify-between'>
        <input className='w-[45%]' name='title' type='text' defaultValue={project.title}/>
        <select className='w-[45%]' name='category' defaultValue={project.category}>
        {
            category.map((category,index)=>(
              <option key={index} value={category.name}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className='flex flex-col mb-4'>
          <label className='text-white mb-1' htmlFor='img'>Image URL</label>
          <input
            className='p-2 rounded bg-gray-800 text-white'
            type='text'
            id='img'
            name='img'
            defaultValue={project.img}
            onChange={handleImgChange}
            required
          />
          {imgUrl && (
            <div className='relative w-96 h-44 mt-2'>
              <Image
                src={imgUrl}
                alt={project.title}
                fill
                className='absolute w-full h-full '
              />
            </div>
          )}
        </div>
      <textarea placeholder='Description...' name='desc' rows={"11"} defaultValue={project.desc} ></textarea>
      <button >Update</button>
    </form>
</div>
  )
}

export default EditPage
