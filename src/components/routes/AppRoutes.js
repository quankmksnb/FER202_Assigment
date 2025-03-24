import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext"; // Import context
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
import ProductList from "../product/ProductList";

const AppRoutes = () => {
  const location = useLocation();
  const { searchText } = useContext(ProductContext); // Lấy searchText từ context
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isCategoryPage = location.pathname.startsWith("/category/");

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

      {/* Chỉ hiển thị ProductList nếu có searchText */}
      {!isAuthPage && !isProductDetailPage && !isCategoryPage && searchText.trim() !== "" && (
        <ProductList />
      )}

      {!isAuthPage && !isProductDetailPage && (
        <>
          {!isCategoryPage && <Slider />}
          {!isCategoryPage && <Category />}
          {!isCategoryPage && <MainCarousel />}
        </>
      )}

      {!isAuthPage && <Footer />}
    </>
  );
};

export default AppRoutes;
