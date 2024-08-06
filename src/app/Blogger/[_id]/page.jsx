import BlogDetails from "@/components/BlogDetalis/BlogDetalis";
import CommonBlog from "@/components/CommonBlog/CommonBlog";
import {
  fetchBlogger,
  fetchBloggerByTitle,
  fetchBloggers,
  fetchBloggersByCategory,
} from "@/lib/data";

// export async function generateStaticParams() {
//   const { count, blogger } = await fetchBloggers("", 1);
//   return blogger.map(blog => ({
//     title: encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase()),
//   }));
// }

const BlogDetailsPage = async ({ params }) => {
  const { _id } = params;
  // console.log("Received title:", title);

  // استخدام decodeURIComponent مرتين للتأكد من فك التشفير بشكل كامل
  // const decodedTitle = decodeURIComponent(decodeURIComponent(title)).replace(/-/g, ' ');
  // console.log("Decoded title:", decodedTitle);

  const blog = await fetchBlogger(_id);
  // console.log("Fetched blog:", blog);

  const commonBlogs = await fetchBloggersByCategory(blog.category);

  if (!blog) {
    console.log("Blog not found");
    return <div>لم يتم العثور على المدونة</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 container">
      <div className="flex-1 flex flex-col justify-center border-r p-2">
        <h2 className="text-2xl font-bold mt-16 text-right">المقالات المشابهة</h2>
        <div className="flex lg:flex-col items-center justify-center">
          <CommonBlog blogs={commonBlogs} />
        </div>
      </div>

      <div className="flex-[3]">
        <BlogDetails blog={blog} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
