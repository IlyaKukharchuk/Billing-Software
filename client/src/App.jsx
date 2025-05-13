import { Route, Routes } from "react-router-dom";
import "./App.css";
import Menubar from "./components/Menubar/Menubar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import Explore from "./pages/Explore/Explore";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageUsers from "./pages/ManageUsers/ManageUsers";

export default function App() {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/category" element={<ManageCategories />} />
        <Route path="/users" element={<ManageUsers />} />
      </Routes>
    </div>
  );
}
