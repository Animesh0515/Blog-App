import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-amber-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: logo */}
          <div className="flex-shrink-0">
            <Link to="/posts" className="text-amber-100 font-bold text-xl">
              📝 Blog App
            </Link>
          </div>

          {/* Right side: nav links */}
          <div className="flex space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-amber-100 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700/30 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-amber-100 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700/30 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-amber-100 px-3 py-2 text-sm font-medium">
                  👋 {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-amber-100 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700/30 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}



// import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// export default function Navbar() {
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Left side: logo */}
//           <div className="flex-shrink-0">
//             <Link to="/posts" className="text-white font-bold text-xl">
//               📝 Blog App
//             </Link>
//           </div>

//           {/* Right side: nav links */}
//           <div className="flex space-x-4">
//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <span className="text-white px-3 py-2 text-sm font-medium">
//                   👋 {user.username}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

