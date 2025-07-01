import { Routes, Route } from "react-router-dom";
import { SignedIn, SignIn } from "@clerk/clerk-react";
import Home from "./pages/home";
import Write from "./pages/Write";
import BlogList from "./pages/BlogList";
import AboutPage from "./pages/AboutPage"; // ✅ new import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/about" element={<AboutPage />} /> {/* ✅ new route */}
      <Route
        path="/write-blog"
        element={
          <SignedIn>
            <Write />
          </SignedIn>
        }
      />
      <Route path="/sign-in" element={<SignIn redirectUrl="/write-blog" />} />
    </Routes>
  );
};

export default AppRoutes;
