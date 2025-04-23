import { Route, Routes } from "react-router";
import App from "./App";
import UserLayout from "./components/layouts/user/user.layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import ForgotPW from "./pages/auth/ForgotPW";
import ResetPW from "./pages/auth/ResetPW";

import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/layouts/admin/admin.layout";
import ManageUser from "./pages/admin/manage.user";
import ManagePermission from "./pages/admin/manage.permission";
import ManageProject from "./pages/user/manage-project";
import ProjectDetail from "./pages/user/project-detail";
import ManageRole from "./pages/admin/manage.role";
import UserProfile from "./pages/user/UserProfile";
import RoomDetail from "./pages/user/room-detail";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify" element={<Verify />} />
    <Route path="/forgot-password" element={<ForgotPW />} />
    <Route path="/reset" element={<ResetPW />} />

    <Route path="/" element={<UserLayout />}>
      <Route index element={<App />} />
      <Route path="project" element={<ManageProject />} />
      <Route path="project/:projectId" element={<ProjectDetail />} />
      <Route path="room/:roomId" element={<RoomDetail />} />
      <Route path="profile" element={<UserProfile />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="manage-user" element={<ManageUser />} />
      <Route path="manage-permission" element={<ManagePermission />} />
      <Route path="manage-role" element={<ManageRole />} />
    </Route>
  </Routes>
);

export default AppRoutes;
