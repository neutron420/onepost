// src/App.tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import { BackgroundPaths } from "./components/ui/background-paths";
import HomePage from "./pages/home";

export default function App() {
  return (
    <Routes>
      {/* Public landing page - shows to everyone */}
      <Route 
        path="/" 
        element={
          <div className="relative">
            {/* Enhanced WHITE Sign In Button for unauthenticated users */}
            <SignedOut>
              <div className="absolute top-6 right-6 z-20">
                <SignInButton mode="redirect" redirectUrl="/dashboard">
                  <button className="group relative px-8 py-3 bg-white/95 hover:bg-white 
                    text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-0.5 
                    border border-black/10 backdrop-blur-sm
                    before:absolute before:inset-0 before:rounded-2xl 
                    before:bg-gradient-to-r before:from-black/5 before:to-transparent 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
                    <span className="relative flex items-center gap-2">
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Sign In
                    </span>
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            
            {/* Enhanced User Button for authenticated users */}
            <SignedIn>
              <div className="absolute top-6 right-6 z-20">
                <div className="flex items-center gap-4">
                  {/* Welcome message with elegant styling */}
                  <div className="hidden sm:block px-4 py-2 bg-white/80 backdrop-blur-md 
                    rounded-xl border border-neutral-200/50 shadow-sm">
                    <span className="text-sm font-medium text-neutral-700">Welcome back</span>
                  </div>
                  
                  {/* Enhanced UserButton container */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 
                      rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    <div className="relative bg-white rounded-full p-1 shadow-lg">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 ring-2 ring-neutral-200 ring-offset-2 ring-offset-white transition-all duration-300 hover:ring-neutral-300",
                            userButtonPopoverCard: "shadow-2xl border border-neutral-200/50 backdrop-blur-md",
                            userButtonPopoverActions: "bg-white/95"
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SignedIn>
            
            {/* Your animated landing page */}
            <BackgroundPaths title="One Post" />
          </div>
        } 
      />
      
      {/* Protected dashboard/app routes */}
      <Route 
        path="/dashboard" 
        element={
          <SignedIn>
            {/* Enhanced dashboard header */}
            <header className="relative bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  {/* Logo/Brand */}
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 
                      bg-clip-text text-transparent">
                      One Post
                    </h1>
                    <span className="ml-3 px-3 py-1 text-xs font-medium bg-neutral-100 
                      text-neutral-600 rounded-full">
                      Dashboard
                    </span>
                  </div>
                  
                  {/* Enhanced user section */}
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-neutral-900">Dashboard</p>
                      <p className="text-xs text-neutral-500">Manage your content</p>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 
                        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                      <div className="relative bg-white rounded-full p-1 shadow-md">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-10 h-10 ring-2 ring-neutral-200 ring-offset-2 ring-offset-white",
                              userButtonPopoverCard: "shadow-2xl border border-neutral-200/50"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
              <HomePage />
            </main>
          </SignedIn>
        } 
      />
      
      {/* Enhanced redirect page for unauthenticated users trying to access dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <SignedOut>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white">
              <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-neutral-200/50">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-neutral-100 to-neutral-200 
                    rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Access Required</h2>
                    <p className="text-neutral-600">
                      Please sign in to access your dashboard and manage your content.
                    </p>
                  </div>
                  
                  {/* Enhanced WHITE Sign In Button */}
                  <SignInButton mode="redirect" redirectUrl="/dashboard">
                    <button className="w-full group relative px-6 py-4 bg-white hover:bg-gray-50 
                      text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl 
                      transition-all duration-300 hover:-translate-y-0.5 
                      border border-gray-200 overflow-hidden">
                      <span className="relative flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sign In to Dashboard
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gray-50/50 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </SignInButton>
                  
                  {/* Back to home link */}
                  <div className="text-center mt-6">
                    <a href="/" className="text-sm text-neutral-500 hover:text-neutral-700 
                      transition-colors duration-200 inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SignedOut>
        } 
      />
    </Routes>
  );
}