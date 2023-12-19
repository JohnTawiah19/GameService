import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/dashboard";

type Props = {};

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export const router = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.element,
    errorElement: <ErrorBoundary />,
    // loader: <div>Loading...</div>,
  }))
);

export default function RoutesService({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
