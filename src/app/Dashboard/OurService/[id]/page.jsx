import { fetchService } from '@/lib/data';
import React from 'react'
import EditPage from './EditPage/EditPage';

async function EditOurServicePage({params}) {
    const { id } = params;
    const initData = await fetchService(id);
    const service = JSON.parse(JSON.stringify(initData));
  
    if (!service) {
      return <div>error in page</div>;
    }
  
    return (
      <EditPage id={id} service={service} />
    )
  }

export default EditOurServicePage
