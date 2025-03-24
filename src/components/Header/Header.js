import React, { useState, useContext, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import {
  NotificationsNone,
  ShoppingCartOutlined,
  ExpandMoreOutlined,
  Favorite,
} from "@mui/icons-material";
import { Dropdown, Badge, Button } from "antd";
import CategoryList from "../Category/CategoryList";

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
    <div className="cart-dropdown">
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-dropdown-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price} $</p>
                <p className="cart-item-quantity">Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="cart-dropdown-footer">
            <Button type="primary" block>
              <Link to="/cart">Xem giỏ hàng</Link>
            </Button>
          </div>
        </>
      ) : (
        <p className="cart-empty">Giỏ hàng trống</p>
      )}
    </div>
  );

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
        <Button
          type="default"
          size="large"
          style={{
            borderRadius: 30,
            fontWeight: "bold",
            backgroundColor: "#f0f0f0",
            color: "#1890ff",
            textAlign: "center"
          }}
        >
          Advanced
        </Button>
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
        <div className="relative">
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
          <input placeholder="Search for anything" type="text" />
          <div className="search-category">
            <span>All Categories</span>
            <ExpandMoreOutlined />
          </div>
          <button className="search-button">Search</button>
        </div>
        {/* Hiển thị nút Button thay vì liên kết */}
        {renderRoleLink()}
      </div>

      <nav className="header-bottom">
        <ul>
          {MENU_ITEMS.map((item, index) => (
            <li key={index} className={item === "Home" ? "active" : ""}>
              <a href="#">
                {item === "Saved" ? <Favorite className="icon" /> : null} {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
