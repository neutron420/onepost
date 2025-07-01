import React, { useState } from "react";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { saveBlogPost } from "@/lib/blogService";
import { useNavigate, Link } from "react-router-dom";
import SidebarLayout from "@/components/SidebarLayout";
import {
  FiEdit3,
  FiUser,
  FiArrowRight,
  FiImage,
} from "react-icons/fi";

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const savePost = (imageUrl?: string) => {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        imageUrl,
        authorName: user?.fullName || "Anonymous",
        createdAt: new Date().toISOString(),
      };
      saveBlogPost(newPost);
      navigate("/blogs");
    };

    try {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          savePost(reader.result as string);
          setIsSubmitting(false);
        };
        reader.readAsDataURL(image);
      } else {
        savePost();
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-gray-800 to-gray-500 rounded-xl">
                  <FiEdit3 className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                  <p className="text-gray-600 text-sm">Share your thoughts with the world</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SignedIn>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <FiUser className="text-gray-600 text-sm" />
                    <span className="text-sm text-gray-700 font-medium">
                      {user?.fullName}
                    </span>
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-lg hover:from-gray-900 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      <FiUser className="text-sm" />
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Post Title
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging title for your post..."
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Content
                </label>
                <textarea
                  placeholder="Start writing your story... Share your ideas, experiences, or insights with your readers."
                  value={content}
                  required
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Write as much as you want</span>
                  <span>{content.length} characters</span>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  Featured Image
                  <span className="text-gray-500 font-normal ml-1">(Optional)</span>
                </label>

                {previewUrl ? (
                  <div className="relative group">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                        <button
                          type="button"
                          onClick={() => document.getElementById("imageInput")?.click()}
                          className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById("imageInput")?.click()}
                    className="group w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-500 hover:bg-gray-100 transition-all duration-200 flex flex-col items-center justify-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-100 group-hover:bg-gray-200 rounded-full transition-colors duration-200">
                        <FiImage className="text-gray-400 group-hover:text-gray-800 text-2xl transition-colors duration-200" />
                      </div>
                      <p className="text-gray-600 group-hover:text-black font-medium mt-3 transition-colors duration-200">
                        Click to upload an image
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}

                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
                <Link
                  to="/blogs"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                >
                  View all posts
                  <FiArrowRight className="text-xs" />
                </Link>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/blogs")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-black to-gray-700 text-white rounded-xl hover:from-gray-900 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="text-sm" />
                        Publish Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gradient-to-r from-white to-gray-100 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Writing Tips</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use a compelling title that grabs attention</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                <span>Add an engaging featured image</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                <span>Break up long paragraphs for better readability</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                <span>End with a call-to-action or question</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default WriteBlog;
