import { fetchReviwesSec } from '@/lib/data'
import React, { use } from 'react'
import Reviews from './Reviews'

async function fetchReviewsData(q, page) {
    return await fetchReviwesSec(q, page);
}

function ReviewsSec() {
    const page = 1;
    const q = "";
    const review = use(fetchReviewsData(q, page));
    const reviewData = review ? JSON.parse(JSON.stringify(review)) : "";

    return (
        <div>
            <Reviews reviews={reviewData}/>
        </div>
    )
}

export default ReviewsSec;
