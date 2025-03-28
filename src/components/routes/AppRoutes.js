import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext"; // Import context
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slider from "../carousel/Slider";
import Category from "../Category/Category";
import MainCarousel from "../maincarousel/maincarousel";
import CategoryProducts from "../Category/CategoryProducts";
import Login from "../login_signup/Login";
import Register from "../login_signup/Register";
import ProductDetail from "../product/ProductDetail";
import AddProduct from "../product/AddProduct";
import ProductList from "../product/ProductList";
import ProductOfSaler from "../product/ProductOfSaler";
import MyShopProduct from "../product/MyShopProduct";
import AccountManagement from "../account/AccountManagement";
import AccountDetail from "../account/AccountDetail";
import AccountCreate from "../account/AccountCreate";
import OrderHistory from "../product/OrderHistory";
import CartPage from "../../pages/CartPage";

const AppRoutes = () => {
  const location = useLocation();
  const { searchText } = useContext(ProductContext); // Lấy searchText từ context

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isCategoryPage = location.pathname.startsWith("/category/");
  const isSpecialPage =
    location.pathname.startsWith("/myshopproduct/") ||
    location.pathname.startsWith("/productofsaler/") ||
    location.pathname === "/productlist";
  const isAccountManagementPage = location.pathname === "/account";
  const isCreatePage = location.pathname === '/create-account';
  const isOrderHistoryPage = location.pathname === "/order-history"; // Kiểm tra trang OrderHistory


  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/myshopproduct/:id" element={<MyShopProduct />} />
        <Route path="/productofsaler/:id" element={<ProductOfSaler />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/account/:id" element={<AccountDetail />} />
        <Route path="/create-account" element={<AccountCreate />} />
      </Routes>

      {/* Chỉ hiển thị ProductList nếu có searchText */}
      {!isAuthPage && !isProductDetailPage && !isCategoryPage && searchText.trim() !== "" && (
        <ProductList />
      )}

      {/* Ẩn Slider, Category, MainCarousel khi ở trang OrderHistory */}
      {!isAuthPage && !isProductDetailPage && !isSpecialPage && !isAccountManagementPage && !isCreatePage && !isOrderHistoryPage && (
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
