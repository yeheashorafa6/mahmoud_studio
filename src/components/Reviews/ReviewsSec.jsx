import { fetchReviwesSec } from '@/lib/data'
import React from 'react'
import Reviews from './Reviews'

async function ReviewsSec() {

    const page = 1
    const q =""
    const review = await fetchReviwesSec(q,page)
  const reviewData =review ? JSON.parse(JSON.stringify(review)) : null;

  // console.log(reviewData)

  return (
    <div>

        <Reviews reviews={reviewData}/>
      
    </div>
  )
}

export default ReviewsSec
