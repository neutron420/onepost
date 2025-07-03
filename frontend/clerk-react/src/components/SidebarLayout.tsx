import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  FaPen, FaHome, FaInfoCircle, FaBars, FaTimes,
  FaBuilding, FaChevronRight, FaUsers, FaBriefcase
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const [isCompanyExpanded, setIsCompanyExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome size={16} /> },
    { name: "Write Blog", path: "/write-blog", icon: <FaPen size={16} /> },
    { name: "All Blogs", path: "/blogs", icon: <FaHome size={16} /> },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about", icon: <FaInfoCircle size={14} /> },
    { name: "Team", path: "/team", icon: <FaUsers size={14} /> },
    { name: "Career", path: "/career", icon: <FaBriefcase size={14} /> },
  ];

  const isCompanyActive = companyLinks.some(link => location.pathname === link.path);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(prev => !prev)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-60 bg-white h-screen shadow-lg fixed top-0 left-0 z-40 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b">
              <img
                src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                alt="Logo"
                className="h-8 w-8"
              />
              <h1 className="text-lg font-bold text-gray-800">OnePost</h1>
            </div>

            {/* Navigation */}
            <nav className="px-2 py-4 space-y-1 flex-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${location.pathname === link.path
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}

              {/* Company Section */}
              <div className="relative">
                <button
                  onClick={() => setIsCompanyExpanded(prev => !prev)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    ${isCompanyActive
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <FaBuilding size={16} />
                  <span className="flex-1 text-left">Company</span>
                  <motion.span
                    animate={{ rotate: isCompanyExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronRight size={12} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isCompanyExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-1 space-y-1 overflow-hidden"
                    >
                      {companyLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                            ${location.pathname === link.path
                              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* User Footer */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <UserButton />
                {user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col min-w-0"
                  >
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {user.fullName || "No name"}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {user.primaryEmailAddress?.emailAddress || "No email"}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-0 min-h-screen">
        <main className="px-4 sm:px-6 lg:px-8 py-3">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
