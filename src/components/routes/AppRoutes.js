import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slider from "../carousel/Slider";
import Category from "../Category/Category";
import MainCarousel from "../maincarousel/maincarousel";
import CategoryProducts from "../Category/CategoryProducts";
import CartPage from "../pages/CartPage";
import Login from "../login_signup/Login";
import Register from "../login_signup/Register";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && (
        <>
          <Slider />
          <Category />
          <MainCarousel />
          <Footer />
        </>
      )}
    </>
  );
};

export default AppRoutes;
