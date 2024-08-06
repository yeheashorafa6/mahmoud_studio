import Link from 'next/link'
import React from 'react'

function CommonBlog({blogs }) {
  // console.log(blogs)
  return (
    <>
    {
      blogs.map((blog)=>(
        <article
        key={blog.id}
            className="rtl relatives mx-auto my-10 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
          >
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <time dateTime="2022-10-10" className="block text-xs text-black font-bold text-right">Publich At : <span className='font-semibold text-gray-500'> {blog.createdAt?.toString().slice(4, 16)} </span></time>

              <Link href={`/Blogger/${blog.id}`}>
                <h3 className="cursor-pointer mt-0.5 text-lg font-medium text-primary text-right">
                  {blog.title}
                </h3>
              </Link>

              <div className="my-4 gap-1">
                <p
                  className="max-w-md   px-2.5 py-0.5 text-sm text-gray-700"
                >
                  {blog.desc}
                </p>
              </div>
              <div className="sm:flex sm:items-end sm:justify-end">
              <Link //${encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase())}
                href={`/Blogger/${blog.id}`}
                className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
              >
                Read Blog
              </Link>
            </div>
            </div>
          </article>
      ))
    }
    </>
  )
}

export default CommonBlog
