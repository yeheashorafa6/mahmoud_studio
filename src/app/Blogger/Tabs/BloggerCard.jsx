import Image from "next/image";
import Link from "next/link";
import React from "react";

function BloggerCard({ blog }) {
  // console.log(blog._id);
  const createdat = new Date(blog.createdAt); // تحويل التاريخ إلى كائن Date مباشرة
  console.log(createdat)

  // استخراج السنة والتاريخ
  const year = createdat.getFullYear();
  const date = createdat.toLocaleDateString("en-US", { day: 'numeric', month: 'long' });
  
  return (
    <article className="flex bg-white transition hover:shadow-xl">
          <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
            <time
              dateTime="2022-10-10"
              className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
            >
              <span>{year}</span>
              <span className="w-px flex-1 bg-gray-900/10"></span>
              <span>{date}</span>
            </time>
          </div>

          <div className="hidden sm:block sm:basis-56">
            <Image
              width={150}
              height={150}
              alt={blog.title}
              src={blog.img}
              className="aspect-square h-full w-full bg-center"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <Link href={`/Blogger/${blog._id}`} className="cursor-pointer">
                <h3 className="font-bold uppercase cursor-pointer text-gray-900">{blog.title}</h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                {blog.desc}
              </p>
              <h6 className="text-sm text-primary">{blog.category}</h6>
            </div>

            <div className="sm:flex sm:items-end sm:justify-end">
              <Link //${encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase())}
                href={`/Blogger/${blog._id}`}
                className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </article>
  );
}

export default BloggerCard;
