import React from "react";
import { projectData } from "../../../../data";
import ProjectDetalis from "@/components/ProjectDetalis/ProjectDetalis";
import MotionGraphicsDetalis from "@/components/MotionGraphicsDetalis/MotionGraphicsDetalis";
import { fetchProject } from "@/lib/data";
// export async function generateStaticParams(){

//     return projectData.map(project=>{
//         title :  encodeURIComponent(project.title.replace(/\s+/g, '-').toLowerCase())
//     })

// }

// export async function getDtat(title){
//     return projectData.find(project=> encodeURIComponent(project.title.replace(/\s+/g, '-').toLowerCase()) === title)
// }
async function SingleProjectPage({ params }) {
  const { _id } = params;
//   console.log(params);
  const project = await fetchProject(_id);
  console.log(project)

  if (!project) {
    return <div>Project not found</div>; // 404 page here if project is not found  (not found page)
  }

    const simpleProject = JSON.parse(JSON.stringify(project));
  return (
    <div>
      {project.category === "Motion graphics" ? (
        <MotionGraphicsDetalis  />
      ) : (
        <ProjectDetalis project={simpleProject} />
      )}
    </div>
  );
}

export default SingleProjectPage;
