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
import ProductDetail from "../product/ProductDetail";
import AddProduct from "../product/AddProduct";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isProductDetailPage = location.pathname.startsWith("/product/");

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && !isProductDetailPage && (
        <>
          <Slider />
          <Category />
          <MainCarousel />
        </>
      )}

      {!isAuthPage && <Footer />}
    </>
  );
};

export default AppRoutes;
