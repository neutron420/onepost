export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorName: string;
  createdAt: string;
}

const STORAGE_KEY = "blog-posts";

export const saveBlogPost = (post: BlogPost) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify([post, ...existing]));
};

export const getBlogPosts = (): BlogPost[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};
