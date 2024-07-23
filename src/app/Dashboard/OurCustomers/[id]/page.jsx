import { fetchCoustome } from '@/lib/data';
import React from 'react'
import EditPage from './EditPage/EditPage';

async function EditOurCustomersPage({params}) {
    const { id } = params;
    const initialData = await fetchCoustome(id);
  
    const coustomeData = JSON.parse(JSON.stringify(initialData));
    if (!initialData) {
      return <div>Error in page</div>;
    }
  return (
    <div>
      <EditPage coustomeData={coustomeData} id={id}/>
    </div>
  )
}

export default EditOurCustomersPage