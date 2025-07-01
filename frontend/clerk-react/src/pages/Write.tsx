import React, { useState } from "react";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { saveBlogPost } from "@/lib/blogService";
import { useNavigate, Link } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        imageUrl: reader.result as string,
        authorName: user?.fullName || "Anonymous",
        createdAt: new Date().toISOString(),
      };
      saveBlogPost(newPost);
      navigate("/blogs");
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        authorName: user?.fullName || "Anonymous",
        createdAt: new Date().toISOString(),
      };
      saveBlogPost(newPost);
      navigate("/blogs");
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Write a New Blog</h2>
          <div className="flex items-center gap-3">
            <SignedIn>
              <span className="text-sm text-gray-600">Signed in as <strong>{user?.fullName}</strong></span>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            placeholder="Write your blog content..."
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Publish
            </button>

            <Link
              to="/blogs"
              className="text-sm text-blue-600 hover:underline"
            >
              See All Blogs →
            </Link>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
};

export default WriteBlog;
