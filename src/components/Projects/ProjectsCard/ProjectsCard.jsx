
"use client";
import DirectionAwareHover  from "@/components/ui/DirectionAwareHover";

function ProjectsCard({item}) {
  return (
    <div className="relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={item.img}>
      <h4 className="text-sm font-medium uppercase tracking-widest text-primary">{item.category}</h4>
         <h2 className="text-lg font-bold text-secondary dark:text-zinc-400 sm:text-2xl ">{item.title}</h2>
         {/* <p className="text-sm text-white max-w-xs dark:text-gray-50 text-left">{item.desc}</p> */}
      </DirectionAwareHover>
    </div>
  );
}

export default ProjectsCard;