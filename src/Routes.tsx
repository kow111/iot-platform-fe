import { Route, Routes } from "react-router";
import App from "./App";
import UserLayout from "./components/layouts/user/user.layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/layouts/admin/admin.layout";
import ManageUser from "./pages/admin/manage.user";
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<UserLayout />}>
      <Route index element={<App />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="manage-user" element={<ManageUser />} />
    </Route>
  </Routes>
);

export default AppRoutes;
