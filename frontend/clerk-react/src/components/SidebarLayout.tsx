import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { FaPen, FaHome, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Write Blog", path: "/write-blog", icon: <FaPen size={16} /> },
    { name: "All Blogs", path: "/blogs", icon: <FaHome size={16} /> },
    { name: "About Us", path: "/about", icon: <FaInfoCircle size={16} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-50 transition-colors"
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 240,
          x: isMobileOpen ? 0 : (window.innerWidth < 768 ? -240 : 0)
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          bg-white shadow-lg flex flex-col justify-between fixed top-0 left-0 h-full z-40
          ${isMobileOpen ? 'block' : 'hidden md:flex'}
        `}
      >
        {/* Top Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-3 min-w-0">
              <motion.img
                src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                alt="One Post Logo"
                className="h-8 w-8 flex-shrink-0"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.h1
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-bold text-gray-800 whitespace-nowrap overflow-hidden"
                  >
                    OnePost
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
            
            {/* Desktop Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FaBars size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium 
                  transition-all duration-200 group relative
                  ${location.pathname === link.path
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {link.name}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom User Section */}
        <div className="border-t p-4">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <UserButton />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="text-sm font-medium text-gray-900 truncate">
                    Ritesh Singh
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    fnaticritesh2004@gmail.com
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main
        animate={{
          marginLeft: isCollapsed ? 80 : 240
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto w-full md:ml-60"
      >
        <div className="md:hidden h-16"></div> {/* Spacer for mobile */}
        {children}
      </motion.main>
    </div>
  );
};

export default SidebarLayout;