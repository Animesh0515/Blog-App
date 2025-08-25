import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PostForm from "../components/PostForm";
import { useToastStore } from "../store/toastStore";
import AuthOnly from "../components/authOnly";
import Navbar from "../components/Navbar";

export default function AddPost() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleAdd = async (data) => {
    try {
      await api.post("/posts/create/", data);
      showToast("Post created successfully!", "success");
      navigate("/posts");
    } catch (err) {
      showToast("Failed to create post", "error");
    }
  };

  return (
    <AuthOnly>
      <div className="bg-amber-50 min-h-screen">
        <div className="py-24 sm:py-32 flex justify-center">
          <div className="max-w-3xl w-full bg-amber-50 shadow-lg rounded-xl p-8 border border-amber-200">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">
              Add Post
            </h1>

            <PostForm
              onSubmit={handleAdd}
              buttonLabel="Create Post"
            />
          </div>
        </div>
      </div>
    </AuthOnly>
  );
}