import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/Leftbar";
import RightBar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminLogin from "./pages/adminLogin/adminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import "./style.scss";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminProtectedRoute = ({ children }) => {
    if (!currentUser || !currentUser.isAdmin) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };
  const RedirectIfLoggedIn = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const AdminLoginRoute = () => {
    if (currentUser) {
      return <Navigate to="/admin/dashboard" />; // Redirect logged-in users
    }
    return <AdminLogin />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: (<Home />),
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <RedirectIfLoggedIn>
          <Login />
        </RedirectIfLoggedIn>
      ),
    },
    {
      path: "/register",
      element: (
        <RedirectIfLoggedIn>
          <Register />
        </RedirectIfLoggedIn>
      ),
    },
    {
      path: "/admin/login",
      element: <AdminLoginRoute />, // Use the new AdminLoginRoute function
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
          <AdminDashboard />
        </AdminProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
