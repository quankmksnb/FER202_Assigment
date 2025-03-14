import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Button, InputNumber, Table } from "antd";
import { Link } from "react-router-dom";
import "./cart.css"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="cart-item">
          <img src={record.image} alt={record.name} className="cart-item-image" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} $`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber min={1} value={quantity} onChange={(value) => updateQuantity(record.id, value)} />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) => `${record.price * record.quantity} $`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => removeFromCart(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="cart-page">
      <h2>Giỏ hàng</h2>
      <Table columns={columns} dataSource={cart} rowKey="id" pagination={false} />

      <div className="cart-footer">
        <h3>Tổng tiền: {totalPrice} $</h3>
        <div className="cart-actions">
          <Button type="primary" danger onClick={clearCart}>
            Xóa tất cả
          </Button>
          <Button type="primary">Thanh toán</Button>
        </div>
      </div>

      <Link to="/" className="back-link">Tiếp tục mua sắm</Link>
    </div>
  );
};

export default CartPage;
