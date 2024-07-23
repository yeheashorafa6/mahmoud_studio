
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
              <time >
                {blog.createdAt?.toString().slice(4, 16)}
              </time>
            </p>
          </div>

          <img
            src={blog.imgDetalis}
            alt={blog.title}
            className="object-contain mb-8"
          />

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
            {blog.sections.map((section, index) => (
              <div key={index} className="mb-6">
                {section.type === "title" && (
                  <h2 className="text-2xl font-bold mb-2 text-primary">
                    {section.content}
                  </h2>
                )}
                {section.type === "text" && (
                  <p>
                    {section.content.split("\n").map((paragraph, index) => (
                      <span key={index}>
                        {paragraph}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
