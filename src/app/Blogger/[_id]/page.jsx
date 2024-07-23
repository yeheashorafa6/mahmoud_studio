import BlogDetails from "@/components/BlogDetalis/BlogDetalis";
import { fetchBlogger } from "@/lib/data";


// const bloggerJson = blogger.map((blog) => JSON.parse(JSON.stringify(blog)));
// export async function generateStaticParams() {
//   return bloggerJson.map(blog => ({
//     title: encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase()),
//   }));
// }

// export async function getData(title) {
//   return bloggerJson.find(blog => encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase()) === title);
// }

const BlogDetailsPage = async ({ params }) => {
  const { _id } = params;
  const blog = await fetchBlogger(_id);
  // console.log(blog);

  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
