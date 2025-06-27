import React from "react";
import { Search, 
         HelpCircle, 
         Bell, 
         LogOut, } from "lucide-react"; // Make sure this package is installed
import { useNavigate } from "react-router-dom";

const Navbar = ({ title, subtitle, user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };


  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 text-sm rounded-lg pl-10 pr-4 py-2 w-48 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* Help */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle size={20} className="text-gray-500" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-500" />
          </button>
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
