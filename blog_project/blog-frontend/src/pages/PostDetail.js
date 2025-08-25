import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthOnly from "../components/authOnly"; 
import { Edit, Trash } from "lucide-react";
import { useToastStore } from "../store/toastStore";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const showConfirm = useToastStore((state) => state.showConfirm);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}/`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    showConfirm("Are you sure you want to delete this post?", async () => {
      try {
        await api.delete(`/posts/${id}/delete/`); 
        navigate("/posts");
      } catch (err) {
        showToast(err.response?.data?.error ||"Failed to delete post", "error");
      }
    });
  };

  return (
    <div className="bg-amber-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto bg-amber-100 rounded-2xl shadow-lg p-8 border border-amber-200 relative">
        {post ? (
          <>
            {/* Authenticated Actions */}
            <AuthOnly>
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() => navigate(`/posts/${id}/edit`)}
                  title="Edit Post"
                  className="p-2 rounded-full hover:bg-amber-200 transition"
                >
                  <Edit size={20} className="text-amber-900" />
                </button>
                <button
                  onClick={handleDelete}
                  title="Delete Post"
                  className="p-2 rounded-full hover:bg-amber-200 transition"
                >
                  <Trash size={20} className="text-red-600" />
                </button>
              </div>
            </AuthOnly>

            <h1 className="text-4xl font-bold text-amber-900 mb-6">
              {post.title}
            </h1>
            <p className="text-amber-800 mb-8">{post.content}</p>
            <p className="text-sm text-amber-700 mb-8">
              ✍️ By {post.author} • {new Date(post.created_at).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-center text-amber-900">Loading...</p>
        )}
      </div>
    </div>
  );
}

