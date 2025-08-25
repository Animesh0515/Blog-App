import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../store/toastStore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register/", { username, password });
      showToast("Registered successfully!", "success");
      navigate("/login");
    } catch (err) {
      showToast("Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <div className="bg-amber-50 shadow-xl rounded-2xl p-8 w-full max-w-md border border-amber-300">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">
          Create Your Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="label-primary">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="button-primary"
          >
            Register
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-amber-900 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-small">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}


