import React from 'react'
import Link from 'next/link'
import { PiPhoneBold } from 'react-icons/pi';
import { Calendar, GraduationCap, HomeIcon, MailIcon } from 'lucide-react';

const infoData = [
  { icon: <User2 size={20} />, text: "Mahmoud F Alshourafa" },
  {
    icon: <PiPhoneBold size={20} />,
    text: "+972 567 319 027",
    path: "https://wa.me/972598331702",
  },
  {
    icon: <MailIcon size={20} />,
    text: "info@mah-studio.com",
    path: "mailto:info@mah-studio.com ",
  },
  { icon: <Calendar size={20} />, text: "Born in 1 Juny 1994" },
  { icon: <GraduationCap size={20} />, text: "Multimedia" },
  { icon: <HomeIcon size={20} />, text: "Gaza , Palestine" },
];
function PersonContent() {
  return (
    <div className='text-center md:text-start'>
      <h1 className=' text-xl  m-6 sm:mx-auto xl:mx-0 lg:text-[27px] font-bold mb-5  text-secondary dark:text-[#FED000]'>Unmatched Service Quality for Over 10 Years</h1>
      <p className='max-w-lg m-6 sm:mx-auto xl:mx-0   text-center md:text-start leading-normal font-semibold  text-white dark:text-gray-800  mb-8'>My expertise lies in utilizing Adobe Creative Suite for 2d animator and graphic design</p>
      <div className='grid md:grid-cols-2 gap-4  mb-12 ml-24 sm:ml-44 mx-auto md:ml-0 '>
        {
            infoData.map((item, index)=>(
                <div className='flex gap-x-4 items-center   md:mx-0' key={index}>
                    <p className='text-secondary dark:text-[#FED000]'>{item.icon}</p>
                    {item.path ? (
                        <Link href={item.path} className='text-sm xl:text-lg text-white dark:text-gray-800 font-medium'>
                         {item.text}
                        </Link>
                      ) : (
                        <p className='text-white text-left text-sm xl:text-lg dark:text-gray-800 font-medium'>{item.text}</p>
                      )}
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default PersonContent
