import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Dashboard from "../../pages/Dashboard";
import Calendar from "../../pages/Calendar";
import ContentLibrary from "../../pages/ContentLibrary";
import Analytics from "../../pages/Analytics";
import Team from "../../pages/Team";
import Settings from "../../pages/Settings";
import CreatePost from "../../pages/CreatePost";

const MainLayout = ({ user, setUser }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    const alreadyConnected = localStorage.getItem("fakeConnected");
    if (!alreadyConnected) {
      setShowConnectModal(true);
    }
  }, []);

  const handleContinue = () => {
    localStorage.setItem("fakeConnected", "true");
    setShowConnectModal(false);
  };

  const getPageContent = () => {
    const pageMap = {
      dashboard: {
        component: <Dashboard onChangePage={setCurrentPage} />,
        title: "Dashboard",
        subtitle: "Overview of your social media activity",
      },
      calendar: {
        component: <Calendar />,
        title: "Content Calendar",
        subtitle: "Schedule and manage your upcoming posts",
      },
      "content-library": {
        component: <ContentLibrary />,
        title: "Content Library",
        subtitle: "Manage your media assets and content",
      },
      analytics: {
        component: <Analytics />,
        title: "Analytics",
        subtitle: "Track performance across your social platforms",
      },
      team: {
        component: <Team />,
        title: "Team Management",
        subtitle: "Manage your team members and permissions",
      },
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
    <div className="h-screen bg-gray-50 flex overflow-hidden relative">
      <Sidebar activePage={currentPage} onChangePage={setCurrentPage} />

      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        <Navbar
          title={pageContent.title}
          subtitle={pageContent.subtitle}
          user={user}
          setUser={setUser}
        />

        <main className={`flex-1 overflow-auto p-6 ${showConnectModal ? "blur-sm pointer-events-none" : ""}`}>
          {pageContent.component}
        </main>
      </div>

      {/* 🎯 Popup Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Connect Your Social Accounts</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 border rounded bg-blue-100">📸 Instagram</div>
              <div className="p-3 border rounded bg-blue-100">🐦 Twitter</div>
              <div className="p-3 border rounded bg-blue-100">📘 Facebook</div>
              <div className="p-3 border rounded bg-blue-100">🔗 LinkedIn</div>
            </div>
            <button
              onClick={handleContinue}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
