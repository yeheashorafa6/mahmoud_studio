
import { fetchSlide } from '@/lib/data';
import EditSlidePage from './EditPage/EditPage';

const SingleSlidePage = async ({ params }) => {
  const { id } = params;
  const initialData = await fetchSlide(id);

  const SlideData = JSON.parse(JSON.stringify(initialData));
  if (!initialData) {
    return <div>Error in page</div>;
  }

  return <EditSlidePage id={id} initialData={SlideData} />;
};

export default SingleSlidePage;