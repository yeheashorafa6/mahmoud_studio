import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProjectsCard({project}) {
  // const imageUrl = Array.isArray(project.path) ? project.path[0] : project.path;
  // console.log(project)
  return (

  <Link href={`/Projects/${project._id}`}>
    <div className="relative group h-full p-10  bg-background overflow-hidden rounded-3xl shadow-none dark:shadow-white/20  lg:shadow-2xl transition hover:shadow-lg">
      {

      <Image
        alt={project.category}
        src={project.img}
        fill
        className="absolute rounded-3xl inset-0 h-full w-full object-cover opacity-90 dark:opacity-75 transition-opacity group-hover:opacity-50"
      />
      }

      <div className="relative p-2 sm:p-6 lg:p-8 cursor-pointer">
        <div className="mt-24 cursor-pointer">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <h4 className="text-sm font-medium uppercase tracking-widest text-primary">{project.category}</h4>
            <h2 className="text-lg font-bold text-gray-800 dark:text-zinc-300 sm:text-2xl">{project.title}</h2>
            <p className="max-w-md w-md text-sm text-gray-600  dark:text-gray-50">{project.desc}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>

  )
}

export default ProjectsCard
