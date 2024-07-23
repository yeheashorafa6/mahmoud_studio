"use client"
import Image from 'next/image'
import React from 'react'

function ReviewsCard({ item }) {
  return (
    <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <div className='relative w-14 h-14 rounded-full'>
              <Image
              fill
                alt={item.name}
                src={item.img}
                className="rounded-full absolute w-full h-full object-cover hover:scale-125 transition-all duration-300 cursor-pointer"
              />
          </div>

          <div>
            <h4 className="mt-0.5 text-xl font-semibold text-primary">{item.username}</h4>
            <p className="mt-0.5 text-sm font-light text-secondary">{item.job}</p>

          </div>
        </div>

        <div className='relative h-24'>
        <p className="mt-4 text-black text-left absolute w-full h-full line-clamp-3">
          {item.desc}
        </p>
        </div>
      </blockquote>
  )
}

export default ReviewsCard
