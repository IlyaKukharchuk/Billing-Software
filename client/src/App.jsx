import { Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageCategories from "./pages/ManageCategories.jsx";
import Explore from "./pages/Explore.jsx";
import ManageItems from "./pages/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <div>
      <Menubar />
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/category" element={<ManageCategories />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
