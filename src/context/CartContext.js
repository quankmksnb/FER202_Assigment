import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
  const userId = user ? user.id : null;

  // Hàm lấy thông tin sản phẩm từ bảng products
  const fetchCartWithProducts = async (cartItems) => {
    const updatedCart = await Promise.all(
      cartItems.map(async (item) => {
        const res = await fetch(`http://localhost:9999/products/${item.product_id}`);
        const product = await res.json();
        return { ...item, product }; // Thêm thông tin sản phẩm vào item
      })
    );
    setCart(updatedCart);
  };

  // Load giỏ hàng từ API và lấy thêm thông tin sản phẩm
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:9999/cart?user_id=${userId}`)
        .then((res) => res.json())
        .then((cartItems) => fetchCartWithProducts(cartItems))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [userId]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.product_id === product.id);
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newCartItem = {
        user_id: userId,
        product_id: product.id,
        quantity: 1,
        added_at: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:9999/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCartItem),
      });
      const data = await response.json();

      // Lấy thông tin sản phẩm vừa thêm vào giỏ hàng
      const res = await fetch(`http://localhost:9999/products/${product.id}`);
      const productDetails = await res.json();

      setCart((prevCart) => [...prevCart, { ...data, product: productDetails }]);
    }
  };

  // Hàm xoá sản phẩm khỏi giỏ hàng
  const removeFromCart = async (cartItemId) => {
    await fetch(`http://localhost:9999/cart/${cartItemId}`, {
      method: "DELETE",
    });
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = async (cartItemId, quantity) => {
    await fetch(`http://localhost:9999/cart/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
