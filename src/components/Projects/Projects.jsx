"use client";
import React, { useState } from "react";
import { RiArrowRightCircleLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BsArrowRightCircle } from "react-icons/bs";
import { GoProjectSymlink } from "react-icons/go";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProjectsCard from "./ProjectsCard/ProjectsCard";
import { projectData } from "../../../data";
import Link from "next/link";
import { Button } from "../ui/button";
function Projects({latestProject}) {
  const [project,setProject]=useState(latestProject);
  return (
    <section className="projects bg-[#f7f7ff]">
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:me-0  lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 lg:items-center justify-center lg:gap-16">
          <div className="text-center xl:text-start ">
            <div className="flex my-12 justify-center items-center xl:justify-start">
              {/* <div className="shapeImg bg-dot dark:bg-dotsDark w-7 h-7 bg-center bg-no-repeat " /> */}
              <h1 className="text-3xl font-semibold text-start text-primary dark:text-[#FED000]">
                Latest Projects
              </h1>
            </div>

            <p className="mt-4 mb-10 max-w-md mx-auto text-gray-700 dark:text-gray-400 text-justify">
              Discover the creativity and innovation behind our exceptional
              motion graphics and design projects. Our team of talented
              designers and animators brings ideas to life with captivating
              visuals and dynamic motion. From conceptualization to final
              execution, each project showcases our commitment to
              excellence and creativity.
            </p>

            <Link
              href="/Projects"
              className=" inline-flex shrink-0 items-center gap-2 rounded-full px-5   text-gray-800 dark:text-stone-300 "
            >
              <Button
                sr="true"
                className="group rounded-full hover:bg-[#00F9B9] me-0 sm:me-4 px-6 py-4 sm:text-lg md:text-2xl lg:text-lg "
              >
                <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300'>Show All Projects</span>
                <GoProjectSymlink size={25} className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute '/>
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-2 lg:mx-0">
            <div id="keen-slider" className="keen-slider">
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
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="mt-8 w-full rounded-lg"
              >
                {project.map((item, index) => (
                  <SwiperSlide key={index} className="mb-11">
                    <ProjectsCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
