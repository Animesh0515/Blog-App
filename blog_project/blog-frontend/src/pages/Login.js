import { useState } from "react";
import api from "../api/api";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../store/toastStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginStore = useAuthStore();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login/", { username, password });
      loginStore.login({ username }, res.data.token);
      navigate("/posts");
    } catch (err) {
      showToast("Login failed.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <div className="bg-amber-50 shadow-xl rounded-2xl p-8 w-full max-w-md border border-amber-300">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
          Login to Your Account 🔑
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="label-primary">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label-primary">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="button-primary"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-amber-900 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="underline hover:.text-small">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}