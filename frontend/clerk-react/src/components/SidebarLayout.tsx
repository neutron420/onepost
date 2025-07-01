import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { FaPen, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Write Blog", path: "/write-blog", icon: <FaPen size={16} /> },
    { name: "All Blogs", path: "/blogs", icon: <FaHome size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col justify-between fixed top-0 left-0 h-full">
        {/* Top Section: Logo + UserButton */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <div className="flex items-center gap-3">
              <motion.img
                src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                alt="One Post Logo"
                className="h-8 w-8"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
              <h1 className="text-lg font-bold text-gray-800">OnePost</h1>
            </div>
            <UserButton />
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom: User Avatar */}
        <div className="border-t px-6 py-4">
          <UserButton />
        </div>
      </aside>

      {/* Main Content Area (with margin to account for fixed sidebar) */}
      <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
