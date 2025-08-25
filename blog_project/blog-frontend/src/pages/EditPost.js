import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import AuthOnly from "../components/authOnly";
import { useToastStore } from "../store/toastStore";
import PostForm from "../components/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const showToast = useToastStore((state) => state.showToast);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  // Fetch the post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}/`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        showToast("Failed to load post");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async ({ title, content }) => {
    try {
      const res = await api.put(`/posts/${id}/edit/`, { title, content });
      showToast("Post updated successfully!");
      setPost(res.data);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || "Failed to update post", "error");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  return (
    <AuthOnly>
      <div className="bg-amber-50 py-24 sm:py-32 min-h-screen">
        <div className="max-w-3xl mx-auto bg-amber-50 shadow-lg rounded-xl p-8 border border-amber-200">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Edit Post
          </h1>

          {/* Created date */}
          {post?.created_at && (
            <p className="text-sm text-amber-700 mb-6">
              Created on: {new Date(post.created_at).toLocaleDateString()}
            </p>
          )}

          <PostForm
            initialValues={post}
            onSubmit={handleSubmit}
            buttonLabel="Update Post"
          />
        </div>
      </div>
    </AuthOnly>
  );
}
