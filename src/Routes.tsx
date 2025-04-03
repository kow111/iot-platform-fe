import { Route, Routes } from "react-router";
import App from "./App";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
);

export default AppRoutes;
