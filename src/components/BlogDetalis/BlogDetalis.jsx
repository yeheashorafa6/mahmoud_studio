import React from "react";
import BlogContent from "./BlogContent";

function BlogDetails({ blog }) {
  return (
    <section dir="rtl" className="text-right pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2 text-primary">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm">
              Published on{" "}
              <time>{blog.createdAt?.toString().slice(4, 16)}</time>
            </p>
          </div>
          {blog.imgDetalis && (
            <img
              src={blog.imgDetalis}
              alt={blog.title}
              className="object-contain mb-8"
            />
          )}
          <BlogContent content={blog.bloggerContent} />
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
