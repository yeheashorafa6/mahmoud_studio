import React from "react";
import { fetchMotion, fetchProject } from "@/lib/data";
import ProjectDetalis from "@/components/ProjectDetalis/ProjectDetalis";
import MotionGraphicsDetalis from "@/components/MotionGraphicsDetalis/MotionGraphicsDetalis";

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
