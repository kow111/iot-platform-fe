import { Route, Routes } from "react-router";
import App from "./App";
import UserLayout from "./components/layouts/user/user.layout";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<App />} />
    </Route>
  </Routes>
);

export default AppRoutes;
