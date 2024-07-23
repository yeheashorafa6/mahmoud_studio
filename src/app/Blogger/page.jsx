import React from "react";
import BloggerTabs from "./Tabs/BloggerTabs";
import { fetchBloggers, fetchBloggersPage } from "@/lib/data";
import Pagination from "@/components/DashboardComp/Pagination/Pagination";

async function BloggerPage({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const blogger = await fetchBloggersPage(q, page);
// console.log("blogger onvoerpepigeiprgien: ",blogger)
  const bloggerJson = blogger.map((blog) => JSON.parse(JSON.stringify(blog)));
// console.log(bloggerJson)
  return (
    <section className="py-6 pb-10 min-h-screen bg-bottom dark:bg-none bg-no-repeat bg-cover">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 justify-center items-center lg:mx-16">
          <BloggerTabs blogger={bloggerJson} />
        </div>
        {/* <div className="mt-5">
          <Pagination  count={count}/>
        </div> */}
      </div>
    </section>
  );
}

export default BloggerPage;
