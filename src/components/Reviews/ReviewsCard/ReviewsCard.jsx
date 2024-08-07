"use client"
import Image from 'next/image'
import React from 'react'

function ReviewsCard({ item }) {
  return (
    <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
        <div className=' rounded-full overflow-hidden hover:scale-125 transition-all duration-300'>
          <Image
            width={56}
            height={56}
            alt={item.username}
            priority
            src={item.img}
            sizes="(max-width: 768px) 56px, (max-width: 1200px) 56px, 56px"
            className="relative rounded-full object-cover  cursor-pointer"
          />
        </div>

          <div>
            <h4 className="mt-0.5 text-xl font-semibold text-primary">{item.username}</h4>
            <p className="mt-0.5 text-sm font-light text-secondary">{item.job}</p>

          </div>
        </div>

        <div className='relative h-[115px]'>
        <p className="mt-4 text-black text-sm absolute w-full h-full text-justify">
          {item.desc}
        </p>
        </div>
      </blockquote>
  )
}

export default ReviewsCard
