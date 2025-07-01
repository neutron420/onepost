import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";
import { FaCamera, FaEdit, FaCheck, FaTimes, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import profilePic from "../assets/profilepic.jpg";

export default function AboutPage() {
  const [profileImage, setProfileImage] = useState<string>(profilePic);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Ritesh Kumar Singh");
  const [title, setTitle] = useState("Founder & Developer");
  const [role, setRole] = useState("Full Stack Engineer");
  const [bio, setBio] = useState("Building tools that help people share their ideas with the world, one post at a time.");
  const [location, setLocation] = useState("New Delhi, IN");
  const [joinDate, setJoinDate] = useState("January 2025");
  const [founderRole, setFounderRole] = useState("Founder");
  
  // Temporary editing states
  const [tempName, setTempName] = useState(name);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempRole, setTempRole] = useState(role);
  const [tempBio, setTempBio] = useState(bio);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempJoinDate, setTempJoinDate] = useState(joinDate);
  const [tempFounderRole, setTempFounderRole] = useState(founderRole);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Set temp values to current values
    setTempName(name);
    setTempTitle(title);
    setTempRole(role);
    setTempBio(bio);
    setTempLocation(location);
    setTempJoinDate(joinDate);
    setTempFounderRole(founderRole);
  };

  const handleSave = () => {
    // Save temp values to main state
    setName(tempName);
    setTitle(tempTitle);
    setRole(tempRole);
    setBio(tempBio);
    setLocation(tempLocation);
    setJoinDate(tempJoinDate);
    setFounderRole(tempFounderRole);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset temp values to original values
    setTempName(name);
    setTempTitle(title);
    setTempRole(role);
    setTempBio(bio);
    setTempLocation(location);
    setTempJoinDate(joinDate);
    setTempFounderRole(founderRole);
    setIsEditing(false);
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">About OnePost</h1>
              <p className="text-lg text-gray-600">Where ideas meet execution</p>
            </div>
            <Link 
              to="/blogs" 
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              View All Blogs
            </Link>
          </div>
          <div className="w-16 h-0.5 bg-black"></div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Story</h2>
                <div className="w-12 h-0.5 bg-gray-900"></div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Founded in 2025, <strong>OnePost</strong> emerged from a simple belief: 
                  that great content deserves great tools. We noticed a gap between 
                  complex publishing platforms and simple note-taking apps.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to provide writers, developers, and creators with 
                  a clean, distraction-free environment where ideas can flourish 
                  without technical barriers getting in the way.
                </p>
              </div>
            </section>

            {/* Mission Section */}
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">What We Do</h2>
                <div className="w-12 h-0.5 bg-gray-900"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">For Writers</h3>
                  <p className="text-gray-600">
                    Clean, distraction-free writing environment with powerful 
                    formatting tools and seamless publishing workflow.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">For Readers</h3>
                  <p className="text-gray-600">
                    Curated, high-quality content delivered through a fast, 
                    accessible interface that puts focus on the writing.
                  </p>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">2025</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">1K+</div>
                <div className="text-sm text-gray-600">Posts Published</div>
              </div>
              <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-sm text-gray-600">Active Writers</div>
              </div>
            </section>
          </div>

          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">Team</h3>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Edit profile"
                      >
                        <FaEdit size={14} />
                      </button>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={handleSave}
                          className="p-1 text-green-600 hover:text-green-700 transition-colors"
                          title="Save changes"
                        >
                          <FaCheck size={14} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 text-red-600 hover:text-red-700 transition-colors"
                          title="Cancel editing"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-8 h-0.5 bg-gray-900 mx-auto"></div>
                </div>

                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative group">
                    <div className="w-full h-full rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100">
                      <img 
                        src={profileImage} 
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/default-avatar.png";
                        }}
                      />
                    </div>
                    
                    {/* Upload Button */}
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                      title="Upload new photo"
                    >
                      <FaCamera size={12} />
                    </button>
                    
                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="text-lg font-bold text-gray-900 text-center bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none w-full"
                    />
                  ) : (
                    <h4 className="text-lg font-bold text-gray-900">{name}</h4>
                  )}
                  
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="text-gray-600 text-center bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none w-full"
                    />
                  ) : (
                    <p className="text-gray-600">{title}</p>
                  )}
                  
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempRole}
                        onChange={(e) => setTempRole(e.target.value)}
                        className="text-sm text-gray-700 bg-transparent outline-none text-center"
                      />
                    ) : (
                      <span className="text-sm text-gray-700">{role}</span>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  {isEditing ? (
                    <textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      className="text-sm text-gray-600 text-center leading-relaxed w-full bg-transparent outline-none resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      "{bio}"
                    </p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempLocation}
                          onChange={(e) => setTempLocation(e.target.value)}
                          className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none text-right"
                        />
                      ) : (
                        <span className="text-gray-900">{location}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempJoinDate}
                          onChange={(e) => setTempJoinDate(e.target.value)}
                          className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none text-right"
                        />
                      ) : (
                        <span className="text-gray-900">{joinDate}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempFounderRole}
                          onChange={(e) => setTempFounderRole(e.target.value)}
                          className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none text-right"
                        />
                      ) : (
                        <span className="text-gray-900">{founderRole}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-3">
                    <a 
                      href="https://linkedin.com/in/your-profile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <FaLinkedin className="text-blue-600" size={18} />
                    </a>
                    <a 
                      href="https://github.com/your-username" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:border-gray-400 transition-colors"
                      title="GitHub Profile"
                    >
                      <FaGithub className="text-gray-800" size={18} />
                    </a>
                    <a 
                      href="https://instagram.com/your-username" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition-colors"
                      title="Instagram Profile"
                    >
                      <FaInstagram className="text-pink-600" size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              ← Back to Home
            </Link>
            <Link 
              to="/write-blog" 
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Writing →
            </Link>
          </div>
        </footer>
      </div>
    </SidebarLayout>
  );
}