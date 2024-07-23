import { fetchReviwe } from '@/lib/data';
import React from 'react'
import EditPage from './EditPage/EditPage';

async function EditReviwesPage({params}) {
    const { id } = params;
    const initialData = await fetchReviwe(id);
  
    const ReviwesData = JSON.parse(JSON.stringify(initialData));
    if (!initialData) {
      return <div>Error in page</div>;
    }
  return (
    <div>
      <EditPage id={id} ReviwesData={ReviwesData}/>
    </div>
  )
}

export default EditReviwesPage
