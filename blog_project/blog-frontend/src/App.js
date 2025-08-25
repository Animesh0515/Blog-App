import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Toast from "./toast/toast";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id/" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/posts/add" element={<AddPost />} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
      <Toast />
    </Router>
  );
}

export default App;
