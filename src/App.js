import React from "react";
import { BrowserRouter as Router, Route, Routes ,useLocation } from "react-router-dom";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Slider from "./components/carousel/Slider";
import Category from "./components/Category/Category";
import CategoryList from "./components/Category/CategoryList";
import CategoryProducts from "./components/Category/CategoryProducts";
import MainCarousel from "./components/maincarousel/maincarousel";
import Seller from "./components/Seller/Seller";
import Footer from "./components/Footer/Footer";
import CategoryProvider from "./context/CategoryContext";
import CartProvider from "./context/CartContext";
import CartPage from "./components/pages/CartPage";

const AppContent = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart"; // Kiểm tra nếu đang ở trang /cart

  return (
    <>
      <Header />
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      {/* Ẩn Slider, Category, MainCarousel nếu đang ở trang /cart */}
      {!isCartPage && (
        <>
          <Slider />
          <Category />
          <MainCarousel />
        </>
      )}

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <CategoryProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </CategoryProvider>
  );
};

export default App;



