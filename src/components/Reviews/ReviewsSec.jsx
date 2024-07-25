import { fetchReviwesSec } from '@/lib/data'
import React from 'react'
import Reviews from './Reviews'

async function ReviewsSec() {

    const page = 1
    const q =""
    const review = await fetchReviwesSec(q,page)
  const reviewData =await JSON.parse(JSON.stringify(review));

//   console.log(reviewData)

  return (
    <div>

        <Reviews reviews={reviewData}/>
      
    </div>
  )
}

export default ReviewsSec
