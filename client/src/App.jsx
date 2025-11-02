import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Verify from "../pages/Verify";
import { useSelector } from "react-redux";
import AdminUsers from "../pages/AdminUsers";
import { useEffect } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { setLogin } from "../states";
import AdminProducts from "../pages/AdminProducts";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await api.get("/api/v1/users/get-me");

        dispatch(setLogin({ user: res.data }));
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV === "development") {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchMyData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? <Admin /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/users"
          element={
            user && user.role === "admin" ? <AdminUsers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/products"
          element={
            user && user.role === "admin" ? (
              <AdminProducts />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            user && user.role === "admin" ? <Admin /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/categories"
          element={
            user && user.role === "admin" ? <Admin /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
