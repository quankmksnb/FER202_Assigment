import React, { useState, useContext, useEffect } from "react";
import "./header.css";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import {
  NotificationsNone,
  ShoppingCartOutlined
} from "@mui/icons-material";
import { Dropdown, Badge, Button, List, Avatar, Divider } from "antd";
import CategoryList from "../Category/CategoryList";
import SalerList from "../saler/SalerList";

const NAV_LINKS = ["Ship to", "Sell", "Watchlist", "My eBay"];

const MENU_ITEMS = [
  "Home",
  "Saved",
  "Electronics",
  "Fashion",
  "Health & Beauty",
  "Motors",
  "Collectibles",
  "Sports",
  "Home & Garden",
  "Deals",
  "Under $10",
];

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext); // Lấy giỏ hàng từ context
  const [open, setOpen] = useState(false); // Kiểm soát dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Thêm state để lưu role của user
  const { setSearchText } = useContext(ProductContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
    if (storedUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUserRole(userData?.roles?.[0]); // Giả sử mỗi user có 1 role
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
  };

  // Render danh sách sản phẩm trong giỏ hàng
  const cartItems = (
    <div className="card cart-dropdown p-3">
      {cart.length > 0 ? (
        <>
          <ul className="list-group list-group-flush">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex align-items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image me-3 rounded"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="cart-item-info flex-grow-1">
                  <p className="mb-1 fw-bold">{item.product.name}</p>
                  <p className="mb-1 text-muted">{item.product.price} $</p>
                  <p className="mb-0">Số lượng: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-dropdown-footer text-center mt-3">
            <Button type="primary" className="btn btn-primary w-100" block>
              <Link to="/cart">Xem giỏ hàng</Link>
            </Button>
          </div>
        </>
      ) : (
        <p className="cart-empty text-center text-muted">Giỏ hàng trống</p>
      )}
    </div>

  );
  <Button type="primary" block>
    <Link to="/cart">Xem giỏ hàng</Link>
  </Button>
  // Render tùy thuộc vào quyền của người dùng
  const renderRoleLink = () => {
    if (userRole === "admin") {
      return (
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: 30, fontWeight: "bold" }}
        >
          <Link to="/create-account" style={{ color: "white" }}>
            Create Account
          </Link>
        </Button>
      );
    } else if (userRole === "saler") {
      return (
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: 30, fontWeight: "bold" }}
        >
          <Link to="/add-product" style={{ color: "white" }}>
            Add Product
          </Link>
        </Button>
      );
    } else {
      return (
        <div style={{ width: "12%", paddingBottom: "20px" }}></div>
      );
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-left">
          <span>
            {isLoggedIn ? (
              <Link onClick={handleLogout}>Logout</Link>
            ) : (
              <nav>
                Hi! <Link to="/login" className="auth-link">Sign in</Link> or
                <Link to="/register" className="auth-link"> Register</Link>
              </nav>
            )}
          </span>
          <ul>
            <li><a href="#">Daily Deals</a></li>
            <li><a href="#">Help & Contact</a></li>
          </ul>
        </div>
        <div className="header-top-right">
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={index}><a href="#">{link}</a></li>
            ))}
            <li><a href="#"><NotificationsNone /></a></li>
            {/* Dropdown giỏ hàng */}
            <Dropdown
              overlay={cartItems}
              open={open}
              onOpenChange={setOpen}
              trigger={["hover"]}
              placement="bottomRight"
            >
              <li className="cart-wrapper">
                <Badge className="cart-badge" count={cart.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                </Badge>
              </li>
            </Dropdown>
          </ul>
        </div>
      </div>

      <div className="header-middle">
        <img
          src="http://pngimg.com/uploads/ebay/ebay_PNG20.png"
          alt="eBay Logo"
          className="logo"
        />
        <div
          className="relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <div
            className="category-dropdown"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>Shop by category</span>
            <span>{showCategories ? "▲" : "▼"}</span>
          </div>

          {/* Hiển thị danh mục với hiệu ứng */}
          <div className={`category-list-container ${showCategories ? "show" : ""}`}>
            <CategoryList />
          </div>
        </div>

        <div className="search-bar">
          <input
            placeholder="Search for anything"
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="search-button">Search</button>
        </div>
        {/* Hiển thị nút Button thay vì liên kết */}
        {renderRoleLink()}
      </div>

      <Row className="d-flex align-items-center">
        <Col className="col-md-1">
          <h4 className="mb-0">Saler:</h4>
        </Col>
        <Col>
          <SalerList />
        </Col>
      </Row>

    </header>
  );
};

export default Header;
