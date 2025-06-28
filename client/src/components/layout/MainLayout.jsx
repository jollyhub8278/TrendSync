import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Dashboard from "../../pages/Dashboard";
import CreatePost from "../../pages/CreatePost";
import Settings from "../../pages/Settings";

const MainLayout = ({ user, setUser }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const getPageContent = () => {
    const pageMap = {
      dashboard: {
        component: <Dashboard onChangePage={setCurrentPage} />,
        title: "Dashboard",
        subtitle: "Overview of your social media activity",
      },
    //   calendar: {
    //     component: <Calendar />,
    //     title: "Content Calendar",
    //     subtitle: "Schedule and manage your upcoming posts",
    //   },
    //   "content-library": {
    //     component: <ContentLibrary />,
    //     title: 'Content Library',
    //     subtitle: 'Manage your media assets and content',
    //   },
    //   analytics: {
    //     component: <Analytics />,
    //     title: 'Analytics',
    //     subtitle: 'Track performance across your social platforms',
    //   },
    //   team: {
    //     component: <Team />,
    //     title: 'Team Management',
    //     subtitle: 'Manage your team members and permissions',
    //   },
      settings: {
        component: <Settings />,
        title: "Settings",
        subtitle: "Configure your account preferences",
      },
      "create-post": {
        component: <CreatePost />,
        title: "Create New Post",
        subtitle: "Draft and schedule your next content piece",
      },
    };

    return pageMap[currentPage] || pageMap["dashboard"];
  };

  const pageContent = getPageContent();

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar activePage={currentPage} onChangePage={setCurrentPage} />

      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        <Navbar
          title={pageContent.title}
          subtitle={pageContent.subtitle}
          user={user}
          setUser={setUser}
        />

        <main className="flex-1 overflow-auto p-6">
          {pageContent.component}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
