import Title from '@/components/Title/Title'
import React from 'react'
import ProjectsTabs from './Tabs/ProjectsTabs'
import "./../fontStyle.css"
import { fetchAudiosPage, fetchMotionsPage, fetchProjectsPage } from '@/lib/data';
// import Pagination from '@/components/DashboardComp/Pagination/Pagination';
export const metadata = {
  title: "All Projects",
  description: "اكتشفوا مجموعة متميزة من المشاريع التي عملت عليها كمصمم جرافيك. تتضمن هذه الصفحة أمثلة متنوعة من أعمالي في تصميم الشعارات، الهويات البصرية، الإعلانات، والمزيد. شاهدوا كيف يمكنني تحويل الأفكار إلى تصاميم مبتكرة تترك أثرًا قويًا وتلبي احتياجات العملاء",
};
async function ProjectsPage({searchParams}) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const  project  = await fetchProjectsPage(q, page);
  const projectsJson = project.map((project) => JSON.parse(JSON.stringify(project)));
  // console.log(projectsJson)
  const  audios  = await fetchAudiosPage(q, page);
  const audiosJson = audios.map((audio) => JSON.parse(JSON.stringify(audio)));

  const motions = await fetchMotionsPage(q,page);
  const MotionJson = motions.map((motion) => JSON.parse(JSON.stringify(motion)));




  return (
    <section className="py-6 pb-10 min-h-screen bg-bottom dark:bg-none bg-no-repeat bg-cover">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 justify-center items-center lg:mx-16">
          <Title title={"My Projects"}/>
          <ProjectsTabs projects={projectsJson} audios={audiosJson} motions={MotionJson}/>
          {/* <Pagination count={count}/> */}
        </div>
      </div>
    </section>    
  )
}

export default ProjectsPage
