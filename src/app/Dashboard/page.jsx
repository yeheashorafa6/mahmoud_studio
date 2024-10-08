import Card from "@/components/DashboardComp/Card/Card";
import Chart from "@/components/DashboardComp/Chart/ChartPage";
import {
  fetchBloggersPage,
  fetchMostVisitedBlogs,
  fetchProjectsPage,
  fetchUsersPage,
} from "@/lib/data";
import React from "react";
import Blogger from "@/components/DashboardComp/Blogger/Blogger";
import { TiDocumentText } from "react-icons/ti";
import { MdSupervisedUserCircle } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";


async function Dashboard() {
  const q = "";
  const page = 1;

  const [users, project, blogger] = await Promise.all([
    fetchUsersPage(q, page),
    fetchProjectsPage(q, page),
    fetchBloggersPage(q, page),
  ]);

  const oldData = {
    users: users.length,
    projects: project.length,
    bloggers: blogger.length,
  };

  const mostVisitedBlogs = await fetchMostVisitedBlogs();
  console.log("Most visited",mostVisitedBlogs)

  return (
    <div className="flex gap-5 mt-5">
      <div className="flex-[3] flex flex-col gap-5">
        <div className="flex gap-x-3 justify-between">
          <Card
            total={"Total Users"}
            link={"/Dashboard/User"}
            count={users.length}
            // oldCount={oldData.users}
            icon={<MdSupervisedUserCircle size={25}/>}
          />
          <Card
            total={"Total Projects"}
            link={"/Dashboard/Projects"}
            count={project.length}
            // oldCount={oldData.projects}
            icon={<TiDocumentText size={25}/>}
          />
          <Card
            total={"Total Bloggers"}
            link={"/Dashboard/Blogger"}
            count={blogger.length}
            // oldCount={oldData.bloggers}
            icon={<RiBloggerLine size={25}/>}
          />
        </div>
        <Blogger mostVisitedBlogs={mostVisitedBlogs} />
        <Chart />
      </div>
      {/* <div className='flex-1'>
        <Rightbar/>
      </div> */}
    </div>
  );
}

export default Dashboard;
