"use client";
import { useEffect } from "react";
import {
  Github,
  Linkedin,
  PenTool,
  Heart,
  Code,
  Target,
  Eye,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout"; // ✅ Correct import
import profilePic from "../assets/profilepic.jpg";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Creator First",
      description:
        "Every feature is designed to empower content creators and help them share their stories effortlessly.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Simplicity",
      description:
        "Clean, intuitive design that gets out of your way so you can focus on what matters - your content.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community",
      description:
        "Building meaningful connections between writers and readers through authentic storytelling.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Leveraging modern technology to create the best possible writing and reading experience.",
    },
  ];

  return (
    <SidebarLayout>
      {/* ✅ CORRECT - Wrap your content inside SidebarLayout */}
      <div className="bg-white text-gray-900">
        {/* Hero Section */}
        <section className="pt-4 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h1 className="text-4xl font-bold">About Onepost</h1>
            <p className="mt-3 max-w-3xl mx-auto text-gray-700">
              A passion project born from the belief that every voice deserves to be heard and every story deserves a beautiful home.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-gray-600" />
                <h2 className="text-2xl font-bold">My Mission</h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                To create a blogging platform that puts writers first...
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-gray-600" />
                <h2 className="text-2xl font-bold">My Vision</h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                A world where anyone can share their thoughts...
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Drives This Project
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-gray-600 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Behind the Scenes */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Behind the Scenes</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={profilePic}
                    alt="Founder"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Ritesh Kumar Singh</h3>
                <p className="text-gray-600 mb-4">Building Onepost from the ground up</p>
                <p className="text-gray-600 mb-4">Full Stack Web Devoloper and Devops Engineer</p>
                <div className="flex justify-center gap-3 mb-6">
                  <a href="#" className="text-gray-400 hover:text-gray-600">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <div className="text-gray-600 space-y-4">
                  <p>Onepost started as a personal project...</p>
                  <p>Every line of code, every design decision was made with intention and care.</p>
                  <p>The journey has been challenging but incredibly rewarding, and I'm proud of what it's become.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Philosophy */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How I Build Onepost
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">User-Centric Design</h3>
                <p className="text-gray-600">
                  Every feature starts with a real user need...
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Rapid Iteration</h3>
                <p className="text-gray-600">
                  Being solo means I can move fast and respond to feedback quickly.
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Passion-Driven Quality</h3>
                <p className="text-gray-600">
                  Every detail matters when you're building something you truly care about.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Have feedback, suggestions, or just want to say hello? I'd love to hear from you.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:hello@onepost.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Follow Updates
              </a>
            </div>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
};

export default AboutPage;