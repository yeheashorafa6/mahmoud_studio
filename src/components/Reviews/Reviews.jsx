"use client";
import React, { useRef, useState } from 'react';
import ReviewsCard from './ReviewsCard/ReviewsCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

function Reviews({ reviews }) {
  const [review, setReview] = useState(reviews);
  // const next = useRef(null);
  // const prev = useRef(null);

  return (
    <section className="bg-[#972AED] h-full">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between items-center">
          <div className="justify-center items-center flex mt-20 mb-6">
            <h1 className="text-3xl font-semibold ml-2 text-white dark:text-[#FED000]">Reviews</h1>
          </div>
          <p className="text-xl text-center md:text-2xl mb-14 font-bold tracking-tight text-white">
            Read trusted reviews from our customers
          </p>
        </div>
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:me-0 lg:pe-0 lg:ps-8">
          {/* <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
            <div className="-top-12 mb-8 relative flex gap-4 lg:mt-0">
              <button
                ref={prev}
                aria-label="Previous slide"
                id="keen-slider-previous"
                className="rounded-full border border-[#FED000] p-2 text-[#FED000] transition hover:bg-primary hover:border-primary hover:text-white"
              >
                <RxDoubleArrowLeft />
              </button>
              <button
                ref={next}
                aria-label="Next slide"
                id="keen-slider-next"
                className="rounded-full border border-[#FED000] p-2 text-[#FED000] transition hover:bg-primary hover:border-primary hover:text-white"
              >
                <RxDoubleArrowRight />
              </button>
            </div>
          </div> */}
          <div className="lg:col-span-2 lg:mx-0">
            <Swiper
              // navigation={{
              //   nextEl: next.current,
              //   prevEl: prev.current,
              // }}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              // onBeforeInit={(swiper) => {
              //   swiper.params.navigation.prevEl = prev.current;
              //   swiper.params.navigation.nextEl = next.current;
              // }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="relative -top-10 w-full rounded-lg"
            >
              {review.map((item, index) => (
                <SwiperSlide key={index} className="mb-11">
                  <ReviewsCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
