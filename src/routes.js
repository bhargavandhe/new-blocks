import Register from "./pages/Register";
import { useRoutes } from "react-router-dom";

// import NotFound from "./pages/Page404";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Page404 from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "/", element: <Login /> },
    {
      path: "/",
      children: [
        { path: "register", element: <Register /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <Page404 /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
