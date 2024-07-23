import React from 'react'
import Projects from './Projects'
import { fetchLatestProjects } from '@/lib/data';

async function LatestProjects() {
    
  const initialData = await fetchLatestProjects("",1);
  const latestProject = JSON.parse(JSON.stringify(initialData));

  // console.log(latestProject);

  return (
    <div>
      <Projects latestProject={latestProject}/>
    </div>
  )
}

export default LatestProjects
