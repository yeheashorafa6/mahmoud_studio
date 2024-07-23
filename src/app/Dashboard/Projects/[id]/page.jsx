
import { updateProject } from '@/lib/action';
import { fetchProject } from '@/lib/data';
import Image from 'next/image'
import React from 'react'
import EditPage from './EditPage/EditPage';

async function SingleProjectsPage({params}) {

  const { id } = params;
  const initData = await fetchProject(id);
  const project = JSON.parse(JSON.stringify(initData));

  if (!project) {
    return <div>error in page</div>;
  }
  return (
    <EditPage project={project} id={id}/>
  )
}

export default SingleProjectsPage
