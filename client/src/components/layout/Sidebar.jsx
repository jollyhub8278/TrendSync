import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  BarChart2,
  Users,
  Settings,
  Menu,
  X,
  PenSquare,
} from "lucide-react";
import Button from "../ui/Button";
const user = JSON.parse(localStorage.getItem("user"));

const Sidebar = ({ activePage, onChangePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "calendar", label: "Calendar", icon: <Calendar size={20} /> },
    {
      id: "content-library",
      label: "Content Library",
      icon: <FolderOpen size={20} />,
    },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
    { id: "team", label: "Team", icon: <Users size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-30
    transition-all duration-300 ease-in-out
    ${collapsed ? "w-20" : "w-64"} 
    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      <button
        className="fixed top-4 left-4 p-2 rounded-md bg-blue-700 text-white md:hidden z-20"
        onClick={toggleMobileSidebar}
      >
        <Menu size={20} />
      </button>

      <div className={sidebarClasses}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
            {!collapsed && (
              <div className="flex items-center">
                <PenSquare className="h-6 w-6 text-blue-700" />
                <span className="ml-2 font-bold text-lg text-gray-900">
                  TrendSync
                </span>
              </div>
            )}
            {collapsed && (
              <div className="flex justify-center w-full">
                <PenSquare className="h-6 w-6 text-blue-700" />
              </div>
            )}
            <button
              className="p-1 rounded-md text-gray-400 hover:bg-gray-100 md:flex hidden"
              onClick={toggleSidebar}
            >
              {collapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-8">
              <Button
                variant="primary"
                fullWidth
                icon={<PenSquare size={16} />}
                iconPosition="left"
                onClick={() => onChangePage("create-post")}
                className="font-semibold"
              >
                {collapsed ? "" : "Create Post"}
              </Button>
            </div>
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`
                    flex items-center py-2 px-4 rounded-md w-full
                    transition-colors duration-200 
                    ${
                      activePage === item.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => onChangePage(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              {!collapsed && user && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
