import { Route, Routes } from "react-router";
import App from "./App";
import UserLayout from "./components/layouts/user/user.layout";
import Login from "./pages/auth/Login";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<App />} />
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
