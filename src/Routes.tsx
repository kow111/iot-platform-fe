import { Route, Routes } from "react-router";
import App from "./App";
import UserLayout from "./components/layouts/user/user.layout";
import Login from "./pages/auth/Login";
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<UserLayout />}>
      <Route index element={<App />} />
    </Route>
  </Routes>
);

export default AppRoutes;
