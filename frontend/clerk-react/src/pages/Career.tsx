"use client";
import React, { useEffect } from "react";
import {
  Code,
  CheckCircle,
  Github,
  GitBranch,
  Users,
  Terminal,
  BookOpen,
  Pen,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";

interface SectionCardProps {
  title: string;
  desc: string;
}

const SectionCard = ({ title, desc }: SectionCardProps) => (
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const ViewRepoCard = () => (
  <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md hover:shadow-xl text-center transition-all">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Involved</h2>
    <p className="text-gray-600 mb-6">
      Ready to make your first contribution? Start with the repository and good first issues.
    </p>
    <div className="flex flex-col items-center space-y-4">
      <a
        href="https://github.com/neutron420/onepost"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <Github className="w-5 h-5" />
        View Repository
      </a>
      <a
        href="https://github.com/onepost/onepost/issues"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:underline text-sm"
      >
        Explore Good First Issues →
      </a>
    </div>
  </div>
);

const ContributePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contributionAreas = [
    {
      title: "Frontend Development",
      desc: "Help improve our React-based writing interface and reader experience",
      icon: <Code className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Backend Development",
      desc: "Enhance our API, database optimization, and content management system",
      icon: <Terminal className="w-8 h-8 text-green-500" />,
    },
    {
      title: "UI/UX Design",
      desc: "Create beautiful, accessible interfaces for writers and readers",
      icon: <Pen className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Content Features",
      desc: "Build rich text editors, markdown support, and publishing tools",
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Documentation",
      desc: "Help us improve developer docs, user guides, and API documentation",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: "Community Support",
      desc: "Assist users, moderate content, and help triage GitHub issues",
      icon: <Users className="w-8 h-8 text-pink-500" />,
    },
  ];

  const benefits = [
    "Build your portfolio with real-world projects",
    "Get mentorship from experienced developers",
    "Featured in our contributor showcase",
    "Exclusive OnePost swag and recognition",
    "Early access to new features",
    "Impact the writing community worldwide",
  ];

  const techStack = [
    { name: "React", desc: "Modern frontend framework" },
    { name: "Next.js", desc: "Full-stack React framework" },
    { name: "TypeScript", desc: "Type-safe JavaScript" },
    { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
    { name: "Node.js", desc: "JavaScript runtime" },
    { name: "Prisma ORM", desc: "Next-gen type-safe ORM" },
    { name: "PostgreSQL", desc: "Reliable relational database" },
    { name: "Docker", desc: "Containerization for consistent dev environments" },
    { name: "NGINX", desc: "High-performance web server and reverse proxy" },
    { name: "Swagger UI", desc: "Interactive API documentation and testing" },
    { name: "WebSockets", desc: "Real-time bidirectional communication" },
    { name: "Redis", desc: "In-memory cache & pub/sub system" },
    { name: "21st.dev Components", desc: "Design system components for modern UIs" },
    { name: "Express js", desc: "For the backend API handling" },
  ];

  return (
    <SidebarLayout>
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 w-full">
        <div className="max-w-6xl mx-auto px-4 py-0">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <GitBranch className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Contribute to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                OnePost
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our open source community building the future of content creation.
              Whether you're a developer, designer, or writer, your contributions help
              millions express their ideas.
            </p>
          </div>

          {/* Contribution Areas */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              How You Can Contribute
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributionAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {area.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{area.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Tech Stack
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              We use modern, open technologies to build a performant and scalable publishing platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((tech, idx) => (
                <SectionCard key={idx} title={tech.name} desc={tech.desc} />
              ))}
            </div>
          </section>

          {/* View Repo Card */}
          <section className="mb-20">
            <ViewRepoCard />
          </section>

          {/* Contributor Benefits */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Contributor Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ContributePage;
