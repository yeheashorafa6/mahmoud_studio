import { updateLatestProject } from '@/lib/action';
import { fetchLatestProject } from '@/lib/data';
import React from 'react'
import EditLatestProjectPage from './EditPage/EditPage';

async function EditLastProjectPage({params}) {
    const { id } = params;
    const initData = await fetchLatestProject(id);
    const latestProject = JSON.parse(JSON.stringify(initData));
  
    if (!latestProject) {
      return <div>error in page</div>;
    }
    return (
      <div>
        <EditLatestProjectPage id={id} project={latestProject}/>
      </div>
      )
}

export default EditLastProjectPage
