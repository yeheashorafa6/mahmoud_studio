"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';
import Link from 'next/link';
function ProjectDetalis({project}) {
  return (
    <section>
    <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
        <div className="relative z-10 lg:py-16">
          <div className="relative h-64 sm:h-80 lg:h-full">
            {/* {
              project.path.length  == 1 ?
              <Image
              fill
              alt={project.title}
              src={project.path[0]}
              className="absolute inset-0 h-full w-full object-cover"
            />
            :
            <Swiper
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                }}
                className="relative h-64 sm:h-80 lg:h-full"
              >
                {
                  project.path.map((image, index) => (
                    <SwiperSlide key={index} className="mb-11">
                        <Image src={image} alt={project.title} priority fill className='absolute inset-0 h-full w-full object-cover' />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            } */}
            <Image
              fill
              alt={project.title}
              src={project.img}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
  
        <div className="relative  flex items-center bg-gray-100">
          <span
            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
          ></span>
  
          <div className="p-8 sm:p-16 lg:p-24 ">
            <h2 className="text-2xl font-bold sm:text-3xl">
             {project.title}
            </h2>
  
            <p className="mt-4 text-gray-600">
              {project.desc}
            </p>
            <Link className='p-3 mt-4 w-56 max-w-sm bg-primary block rounded-3xl text-white' href={"/Projects"}>Go Back To Projects</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ProjectDetalis
