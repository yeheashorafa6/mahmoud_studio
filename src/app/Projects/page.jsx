import Title from '@/components/Title/Title'
import React from 'react'
import ProjectsTabs from './Tabs/ProjectsTabs'
import "./../fontStyle.css"
import { fetchAudios, fetchAudiosPage, fetchProjects, fetchProjectsPage } from '@/lib/data';
import Pagination from '@/components/DashboardComp/Pagination/Pagination';
export const metadata = {
  title: "All Projects",
  description: "This Page Apper All Project related to graphic designer",
};
async function ProjectsPage({searchParams}) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const qury = searchParams?.q || "";
  const p = searchParams?.page || 1;


  const  project  = await fetchProjectsPage(q, page);
  const projectsJson = project.map((project) => JSON.parse(JSON.stringify(project)));
  // console.log(projectsJson)
const  audios  = await fetchAudiosPage(qury, p);

  const audiosJson = audios.map((audio) => JSON.parse(JSON.stringify(audio)));


  return (
    <section className="py-6 pb-10 min-h-screen bg-bottom dark:bg-none bg-no-repeat bg-cover">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 justify-center items-center lg:mx-16">
          <Title title={"My Projects"}/>
          <ProjectsTabs projects={projectsJson} audios={audiosJson}/>
        </div>
      </div>
    </section>    
  )
}

export default ProjectsPage
