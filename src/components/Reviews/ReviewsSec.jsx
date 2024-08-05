import { fetchReviwesSec } from '@/lib/data'
import Reviews from './Reviews'

async function ReviewsSec() {
    const page = 1;
    const q = "";
    const review = await fetchReviwesSec(q, page);
    const reviewData = review ? JSON.parse(JSON.stringify(review)) : [];

    return (
        <div>
            <Reviews reviews={reviewData}/>
        </div>
    )
}

export default ReviewsSec;
