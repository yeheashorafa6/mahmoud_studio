"use client"
import React, { useRef } from 'react'
import Title from '../Title/Title'
import ServiceCard from './ServiceCard/ServiceCard'
import { Swiper , SwiperSlide} from "swiper/react";
import { Navigation, Pagination ,Autoplay} from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RxDoubleArrowRight , RxDoubleArrowLeft} from "react-icons/rx";


// impoer motion
import { motion } from "framer-motion";
function Service({services}) {
    const variantsx = {
        initial: {
          opacity: 0,
          y:50
        },
        animate: {
          opacity: 1,
          y:0,
          transition: {
            duration : 1,
          },
        },
      }

      const next = useRef(null);
      const prev = useRef(null);
    
  return (
<section className="bg-white pb-12 dark:bg-[#030712] service">
  <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8 ">
    <Title title={"Our Services"} />

    <div className="mt-8  md:gap-8">
    <div className=" flex gap-4">
      <button
      ref={next}
        aria-label="Previous slide"
        id="keen-slider-previous"
        className="rounded-full border border-primary p-3 text-primary transition hover:bg-primary hover:text-white"
      >
        <RxDoubleArrowLeft/>
      </button>

      <button
      ref={prev}
        aria-label="Next slide"
        id="keen-slider-next"
        className="rounded-full border border-primary p-3 text-primary transition hover:bg-primary hover:text-white"
      >
        <RxDoubleArrowRight/>
      </button>
    </div>
    <motion.div >
        <Swiper
        navigation={{
            nextEl: prev.current,
            prevEl: next.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prev.current;
            swiper.params.navigation.nextEl = next.current;
          }}
            pagination={{clickable : true}}
            modules={[Navigation, Pagination , Autoplay ]}
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
                // when window width is >= 992px
                992: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    },
                // when window width is >= 1024px
                1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                },
                    }}
                style={{paddingTop : '37px' }}
                className='items-center cursor-pointer'
                
                >
                    
                     {
                services.map((service , index)=>(
                    <SwiperSlide key={index} className='ml-0 sm:ml-5 md:ml-0 mb-10'>
                      <motion.div variants={variantsx} initial="initial" animate="animate" whileInView="animate">
                        <ServiceCard service={service} key={index}/>
                      </motion.div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </motion.div>
    </div>
  </div>
</section>
  )
}

export default Service

