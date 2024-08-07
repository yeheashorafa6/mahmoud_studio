import React from "react";
import { fetchMotion, fetchProject } from "@/lib/data";
import ProjectDetalis from "@/components/ProjectDetalis/ProjectDetalis";
import MotionGraphicsDetalis from "@/components/MotionGraphicsDetalis/MotionGraphicsDetalis";

export async function generateMetadata({ params }) {
  // افترض أن هذه الدالة تجلب بيانات المشروع من قاعدة البيانات
  const projectData = await fetchProject(params._id);
  console.log(projectData)

  return {
    title: `${projectData.title}`,
    description: projectData.description,
    openGraph: {
      images: [
        {
          url: `https://www.mahmoud-studio.com/api/og?title=${encodeURIComponent(projectData.title)}&bg=${encodeURIComponent(projectData.img)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
async function SingleProjectPage({ params ,searchParams }) {
  const { _id } = params;
  const project = await fetchProject(_id);
  const type = searchParams.type || "";

  const simpleProject = JSON.parse(JSON.stringify(project));

  const motions = await fetchMotion(_id);
  const simpleMotion = JSON.parse(JSON.stringify(motions));

  if (!project && !motions) {
    return <div>Project not found</div>;
  }

  return (
    <div>
     {type === 'motion' ? (
        <MotionGraphicsDetalis motion={simpleMotion} />
      ) : (
        <ProjectDetalis project={simpleProject} />
      )}
    </div>
  );
}

export default SingleProjectPage;
