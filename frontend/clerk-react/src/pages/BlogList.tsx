import React, { useState } from "react";
import { getBlogPosts } from "@/lib/blogService";
import { useUser, UserButton } from "@clerk/clerk-react";
import SidebarLayout from "@/components/SidebarLayout";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const POSTS_PER_PAGE = 3;

const BlogList: React.FC = () => {
  const initialBlogs = getBlogPosts();
  const { user } = useUser();

  const [blogs, setBlogs] = useState(initialBlogs);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: string[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [editingBlog, setEditingBlog] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});

  const handleLike = (blogId: string) => {
    if (likedPosts[blogId]) {
      setLikes((prev) => ({
        ...prev,
        [blogId]: Math.max((prev[blogId] || 0) - 1, 0),
      }));
      setLikedPosts((prev) => ({ ...prev, [blogId]: false }));
    } else {
      setLikes((prev) => ({
        ...prev,
        [blogId]: (prev[blogId] || 0) + 1,
      }));
      setLikedPosts((prev) => ({ ...prev, [blogId]: true }));
    }
  };

  const handleAddComment = (blogId: string) => {
    if (!newComment[blogId]?.trim()) return;
    setComments((prev) => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), newComment[blogId].trim()],
    }));
    setNewComment((prev) => ({ ...prev, [blogId]: "" }));
  };

  const toggleComments = (blogId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const handleDelete = (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
    }
  };

  const handleEdit = (blogId: string, content: string) => {
    setEditingBlog(blogId);
    setEditedContent({ ...editedContent, [blogId]: content });
  };

  const handleSaveEdit = (blogId: string) => {
    const updated = blogs.map((blog) =>
      blog.id === blogId ? { ...blog, content: editedContent[blogId] } : blog
    );
    setBlogs(updated);
    setEditingBlog(null);
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {user && (
          <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Welcome, {user.fullName || "User"}</h2>
                <p className="text-sm text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton />
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-8">All Blog Posts</h1>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.slice(0, visibleCount).map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {blog.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        {new Date(blog.createdAt).toDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        editingBlog === blog.id
                          ? handleCancelEdit()
                          : handleEdit(blog.id, blog.content)
                      }
                      className="p-2 text-gray-500 hover:text-blue-600"
                      title={editingBlog === blog.id ? "Cancel" : "Edit"}
                    >
                      {editingBlog === blog.id ? <FaTimes /> : <FaEdit />}
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-gray-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                )}

                {editingBlog === blog.id ? (
                  <div className="mb-4">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-xl resize-none"
                      rows={5}
                      value={editedContent[blog.id] || ""}
                      onChange={(e) =>
                        setEditedContent((prev) => ({
                          ...prev,
                          [blog.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => handleSaveEdit(blog.id)}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                      <FaSave className="inline mr-1" />
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800 mb-4 whitespace-pre-wrap">{blog.content}</p>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-xl transition ${
                      likedPosts[blog.id]
                        ? "text-red-600"
                        : "text-gray-600 hover:text-red-600"
                    }`}
                  >
                    {likedPosts[blog.id] ? <FaHeart /> : <FaRegHeart />}
                    <span>{likes[blog.id] || 0}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(blog.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                  >
                    <FaComment />
                    <span>
                      {showComments[blog.id] ? "Hide" : "Show"} Comments (
                      {(comments[blog.id] || []).length})
                    </span>
                  </button>
                </div>

                {showComments[blog.id] && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2 mb-4">
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-xl"
                      />
                      <button
                        onClick={() => handleAddComment(blog.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                      >
                        Post
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(comments[blog.id] || []).length === 0 ? (
                        <p className="text-gray-500 text-sm">No comments yet.</p>
                      ) : (
                        (comments[blog.id] || []).map((comment, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-gray-800">{comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {visibleCount < blogs.length && (
              <div className="text-center py-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-900"
                >
                  View More Blogs ({blogs.length - visibleCount} remaining)
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
