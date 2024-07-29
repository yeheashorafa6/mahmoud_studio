'use client';

import MotionGraphicsDetalis from "@/components/MotionGraphicsDetalis/MotionGraphicsDetalis";
import ProjectDetalis from "@/components/ProjectDetalis/ProjectDetalis";

export default function ClientSideProjectPage({ project, motion, type }) {
  return (
    <div>
      {type === 'motion' ? (
        <MotionGraphicsDetalis motion={motion} />
      ) : (
        <ProjectDetalis project={project} />
      )}
    </div>
  );
}