import React from 'react';
import { fetchMotion } from '@/lib/data';
import EditPage from './EditPage/Editpage';

const SingleMotionPage = async ({ params }) => {
  const { id } = params;
  const initialData = await fetchMotion(id);
  const SlideData = JSON.parse(JSON.stringify(initialData));


  if (!initialData) {
    return <div>Error in page</div>;
  }

  return <EditPage id={id} initialData={SlideData} />;
};

export default SingleMotionPage;
