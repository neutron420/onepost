import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
} from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BackgroundPaths, BackgroundPathsOverlay } from "./components/ui/background-paths";
import { Footer7 } from "./components/ui/footer-7";
import HomePage from "./pages/home";
import Write from "./pages/Write";
import BlogList from "./pages/BlogList";
import AboutPage from "./pages/AboutPage";
import { PricingSectionDemo } from "./components/blocks/demo";
import Testimonials from "./components/blocks/testimonials-section";
import Notify from "./components/ui/Notify";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

// Landing Page Component
const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <BackgroundPathsOverlay />

    {/* Top-right user/notification panel */}
    <div className="absolute top-6 right-6 z-30 flex items-center gap-4">
      {/* Show interactive Notify when signed in */}
      <SignedIn>
        <Notify />
      </SignedIn>

      {/* Show static bell when signed out */}
      <SignedOut>
        <div className="p-2 rounded-full bg-gray-100 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                     6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165
                     6 8.388 6 11v3.159c0 .538-.214 1.055-.595
                     1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </SignedOut>

      {/* Welcome + Avatar (Only if signed in) */}
      <SignedIn>
        <div className="hidden sm:block px-4 py-2 bg-white/80 backdrop-blur-md 
          rounded-xl border border-neutral-200/50 shadow-sm">
          <span className="text-sm font-medium text-neutral-700">Welcome back</span>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 
            rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative bg-white rounded-full p-1 shadow-lg">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-neutral-200 ring-offset-2 ring-offset-white transition-all duration-300 hover:ring-neutral-300",
                  userButtonPopoverCard: "shadow-2xl border border-neutral-200/50 backdrop-blur-md",
                  userButtonPopoverActions: "bg-white/95",
                },
              }}
            />
          </div>
        </div>
      </SignedIn>

      {/* Sign-in button when signed out */}
      <SignedOut>
        <SignInButton mode="redirect" redirectUrl="/dashboard" asChild>
          <button className="group relative px-8 py-3 bg-white/95 hover:bg-white 
            text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl 
            transition-all duration-300 hover:-translate-y-0.5 
            border border-black/10 backdrop-blur-sm
            before:absolute before:inset-0 before:rounded-2xl 
            before:bg-gradient-to-r before:from-black/5 before:to-transparent 
            before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
            <span className="relative flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0
                         011-1zm7.707 3.293a1 1 0 010 1.414L9.414
                         9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0
                         01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1
                         1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sign In
            </span>
          </button>
        </SignInButton>
      </SignedOut>
    </div>

    {/* Main background section */}
    <main className="flex-1 relative z-10">
      <BackgroundPaths title="One Post" />
    </main>

    {/* Pricing + Testimonials */}
    <section className="bg-white/95 backdrop-blur-sm py-12 px-4 sm:px-8 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto">
        <PricingSectionDemo />
        <Testimonials />
      </div>
    </section>

    <div className="relative z-20">
      <Footer7 />
    </div>
  </div>
);

// Dashboard Component
const Dashboard = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <main className="flex-1 bg-gradient-to-br from-neutral-50 to-white">
      <HomePage />
    </main>

    <section className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <PricingSectionDemo />
        <Testimonials />
      </div>
    </section>

    <Footer7 />
  </div>
);

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/sign-in" element={<SignIn redirectUrl="/dashboard" />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/write-blog" 
        element={
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}