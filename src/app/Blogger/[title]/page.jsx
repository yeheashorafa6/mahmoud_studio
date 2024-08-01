import BlogDetails from "@/components/BlogDetalis/BlogDetalis";
import { fetchBloggerByTitle, fetchBloggers } from "@/lib/data";



export async function generateStaticParams() {
  const { count, blogger } = await fetchBloggers("", 1);
  return blogger.map(blog => ({
    title: encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase()),
  }));
}

const BlogDetailsPage = async ({ params }) => {
  const { title } = params;
  console.log("Received title:", title);
  
  // استخدام decodeURIComponent مرتين للتأكد من فك التشفير بشكل كامل
  const decodedTitle = decodeURIComponent(decodeURIComponent(title)).replace(/-/g, ' ');
  console.log("Decoded title:", decodedTitle);
  
  const blog = await fetchBloggerByTitle(decodedTitle);
  console.log("Fetched blog:", blog);

  if (!blog) {
    console.log("Blog not found");
    return <div>لم يتم العثور على المدونة</div>;
  }

  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
