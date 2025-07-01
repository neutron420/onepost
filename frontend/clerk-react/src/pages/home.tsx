import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold mb-6">Welcome to One Post</h1>
      <Button onClick={() => navigate("/write")}>Write a Blog</Button>
      <Button className="ml-4" onClick={() => navigate("/blogs")}>View Blogs</Button>
    </div>
  );
};

export default Home;
