import BlogDetails from "@/components/BlogDetalis/BlogDetalis";
import { fetchBloggerByTitle, fetchBloggers } from "@/lib/data";



export async function generateStaticParams() {
  const {count,blogger} = await fetchBloggers("",1);
  const result = blogger.map(blog => ({
    title: encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase()),
  }));
  return result
}


const BlogDetailsPage = async ({ params }) => {
  const { title } = params;
  const decodedTitle = decodeURIComponent(title).replace(/-/g, ' ');
  const blog = await fetchBloggerByTitle(decodedTitle);


  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
