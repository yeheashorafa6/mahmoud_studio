"use client"
import React from 'react';
import Image from 'next/image';
import Title from '../Title/Title';
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation, Pagination ,Autoplay} from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
// impoer motion
import { motion } from "framer-motion";

function OurCustomers({coustome}) {
  const variantsx = {
    initial: {
      opacity: 0,
      x:50
    },
    animate: {
      opacity: 1,
      x:0,
      transition: {
        duration : 1,
      },
    },
  }

  return (
    <motion.section className="relative z-20 h-full pb-12" >
      <div className="container mx-auto">
        <Title title="Our Customers" />
        <motion.div variants={variantsx} initial="initial" whileInView="animate" className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
 
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
            className="relative rounded-lg "
          >
            {coustome.map((item, index) => (
              <SwiperSlide key={index} className="mb-11">
               <Link target='_blank' href={item.link}>
               <div className="hover:scale-125 ease-in-out flex justify-center transition-all duration-500 cursor-pointer">
                  <Image src={item.img} width={150} height={150} alt={item.image} />
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default OurCustomers;
