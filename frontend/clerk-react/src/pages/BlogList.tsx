import React, { useState } from "react";
import { getBlogPosts } from "@/lib/blogService";
import { useUser, UserButton } from "@clerk/clerk-react";
import SidebarLayout from "@/components/SidebarLayout"; // ✅ import sidebar

const POSTS_PER_PAGE = 5;

const BlogList: React.FC = () => {
  const blogs = getBlogPosts();
  const { user } = useUser();

  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const handleLike = (blogId: string) => {
    setLikes((prev) => ({
      ...prev,
      [blogId]: (prev[blogId] || 0) + 1,
    }));
  };

  const handleAddComment = (blogId: string) => {
    if (!newComment[blogId]) return;
    setComments((prev) => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), newComment[blogId]],
    }));
    setNewComment((prev) => ({ ...prev, [blogId]: "" }));
  };

  const toggleComments = (blogId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        {user && (
          <div className="flex items-center justify-between mb-8 p-4 bg-white shadow rounded-xl border">
            <div>
              <h2 className="text-xl font-semibold">Welcome, {user.fullName || "User"}</h2>
              <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <UserButton />
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6 text-center">📝 All Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blog posts yet.</p>
        ) : (
          <div className="space-y-10">
            {blogs.slice(0, visibleCount).map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-black">{blog.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  by {blog.authorName} on {new Date(blog.createdAt).toDateString()}
                </p>

                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt="blog visual"
                    className="mt-4 rounded-xl w-full max-h-[400px] object-cover"
                  />
                )}

                <p className="mt-4 text-gray-700">{blog.content}</p>

                <div className="mt-6 flex items-center gap-6">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="text-sm flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    ❤️ {likes[blog.id] || 0} Likes
                  </button>
                  <button
                    onClick={() => toggleComments(blog.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {showComments[blog.id] ? "Hide" : "Show"} Comments
                  </button>
                </div>

                {showComments[blog.id] && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[blog.id] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [blog.id]: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded text-sm"
                    />
                    <button
                      onClick={() => handleAddComment(blog.id)}
                      className="mt-1 text-sm bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
                    >
                      Add Comment
                    </button>

                    <div className="mt-3 space-y-2">
                      {(comments[blog.id] || []).map((cmt, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 bg-gray-100 p-2 rounded"
                        >
                          💬 {cmt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {visibleCount < blogs.length && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default BlogList;
