import { useAuthStore } from "../store/authStore";

/**
 * AuthOnly wrapper
 * Usage: Wrap around any JSX that should only be shown to authenticated users.
 * If no token -> hides children
 */
export default function AuthOnly({ children }) {
  const token = useAuthStore((state) => state.token);
  if (!token) return null;   // Hide content if not authenticated
  return <>{children}</>;    // Render children if authenticated
}
