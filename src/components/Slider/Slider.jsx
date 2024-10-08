"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";


function Slider({ slideData }) {
  const [slide, setSlide] = useState(slideData);
  // console.log(slide)
  const next = useRef(null);
  const prev = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="slider bg-gradient-to-bl from-primary  to-primary  m-0 max-w-full lg:bg-cover overflow-hidden  relative z-20">
      <div className="lg:col-span-2 lg:mx-0">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          speed={1200}
          coverflowEffect={{
            rotate: 50,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            nextEl: prev.current,
            prevEl: next.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prev.current;
            swiper.params.navigation.nextEl = next.current;
          }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="customSwiper max-h-screen max-w-full object-contain "
        >
          {
            isMobile ? 
            slide.map((item, index) => (
              <SwiperSlide key={index} className="overflow-x-hidden">
                <img
                  src={item.imgMobile}
                  className=" max-w-full overflow-x-hidden bg-center object-center  "
                  alt="slider"
                />
              </SwiperSlide>
            ))
            :
            slide.map((item, index) => (
              <SwiperSlide key={index} className="overflow-x-hidden">
                <img
                  src={item.img}
                  className=" max-w-full overflow-x-hidden bg-center object-center  "
                  alt="slider"
                />
              </SwiperSlide>
            ))
            
            }
        </Swiper>
        <div className="absolute  mt-8 flex gap-4 lg:mt-0 top-40 md:top-16 lg:top-44 xl:top-[277px]  z-20 left-7">
          <button
            ref={next}
            aria-label="Previous slide"
            id="keen-slider-previous"
            className="  rounded-full text-lg border border-white p-2 md:p-3 text-white transition hover:bg-[#f6377a] hover:text-white"
          >
            <RxDoubleArrowLeft />
          </button>
        </div>
        <div className="absolute  mt-8 flex gap-4 lg:mt-0 top-40 md:top-16 lg:top-44 xl:top-[277px]  z-20 right-7">
          <button
            ref={prev}
            aria-label="Next slide"
            id="keen-slider-next"
            className=" xl:bottom-16  lg:top-36 top-20 z-20 right-7 rounded-full text-lg border border-white p-2 md:p-3 text-white  transition hover:bg-[#f6377a] hover:text-white"
          >
            <RxDoubleArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Slider;
