import React from 'react'
import { qualificationData } from '../../../../data';
import { Briefcase  , GraduationCap} from 'lucide-react';
function QualificationContent() {
    const getData = (arr, title) => {
        return arr.find((item) => item.title === title);
      };
     const educationData =  getData(qualificationData, "education");
     const experienceData =  getData(qualificationData, "experience");

  return (
    <div className='text-center md:text-start xl:mr-24'>
    <h3 className='text-2xl md:text-3xl font-bold mb-10  text-white dark:text-black'>My Awesome Journey</h3>
    <div className='grid md:grid-cols-2 gap-8  mb-12 justify-center'>
      <div className='flex flex-col gap-y-4 '>
        <div className='flex gap-x-4 items-center text-primary text-[22px]'>
            <Briefcase size={25} className='text-[#FED000]'/>
            <h2 className='capitalize font-medium text-[#FED000]'>{educationData.title}</h2>
        </div>
        <div className='flex flex-col gap-y-3'>
            {experienceData.data.map((item,index)=>(
                <div className='flex gap-x-8 group cursor-pointer' key={index}>
                        <div className='h-[84px] w-[1px] bg-border relative ml-2'>
                            <div className='w-[11px] h-[11px] rounded-full bg-[#FED000] absolute -left-[5px] 
                            group-hover:translate-y-[84px] transition-all duration-500' />
                        </div>
                    <div>
                    <h2 className='font-bold text-xl leading-none mb-2 text-start text-[#FED000]'>{item.company}</h2>
                        <h3 className='text-lg leading-none font-medium mb-2 text-white text-start dark:text-gray-900'>{item.role}</h3>
                        <p className='font-medium text-base text-white text-start dark:text-gray-800'>{item.years}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col gap-y-4'>
        <div className='flex gap-x-4 items-center text-primary text-[22px]'>
            <GraduationCap size={25} className='text-[#FED000]'/>
            <h2 className='capitalize font-medium text-[#FED000]'>{experienceData.title}</h2>
        </div>
        <div className='flex flex-col gap-y-4'>
            {educationData.data.map((item,index)=>(
                <div className='flex gap-x-8 group cursor-pointer' key={index}>
                        <div className='h-[84px] w-[1px] bg-border relative ml-2'>
                            <div className='w-[11px] h-[11px] rounded-full bg-[#FED000] absolute -left-[5px] 
                            group-hover:translate-y-[84px] transition-all duration-500' />
                        </div>
                    <div>
                        <h2 className='font-bold text-xl leading-none mb-2 text-start text-[#FED000]'>{item.university}</h2>
                        <h3 className='text-lg leading-none font-medium mb-2 text-white text-start dark:text-gray-900'>{item.role}</h3>
                        <p className='font-medium text-base text-white text-start dark:text-gray-800'>{item.years}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default QualificationContent
