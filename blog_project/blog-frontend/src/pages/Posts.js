import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import AuthOnly from "../components/authOnly"; 
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/posts/")
      .then(res => setPosts(res.data))
      .catch(err => alert(err.response?.data?.error || "Failed to fetch posts"));
  }, []);

  return (
    <div className="bg-amber-50 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl">
            📚 Blog Posts
          </h2>
          <p className="mt-2 text-lg text-amber-700">Catch up on the latest posts</p>
        </div>

        {/* Posts Grid */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 
                        border-t border-amber-200 pt-10 sm:mt-16 sm:pt-16 
                        lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-amber-700 text-center">
              <p className="text-xl mb-6">No Post added yet.</p>
            </div>
          ): (
            posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between 
                           bg-amber-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="group relative grow">
                  <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-700">
                    <Link to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-amber-800 text-sm">
                    {post.content}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Floating Add Button (bottom-right) */}
      <AuthOnly>
        <button
          onClick={() => navigate("/posts/add")}
          className="fixed bottom-8 right-8 flex items-center justify-center 
                     w-14 h-14 rounded-full bg-amber-800 hover:bg-amber-900 shadow-md"
        >
          <Plus size={28} className="text-white" />
        </button>
      </AuthOnly>
    </div>
  );
}
