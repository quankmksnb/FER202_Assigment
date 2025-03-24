import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Button, InputNumber, Table } from "antd";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart.css";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  // Tính tổng tiền
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🛒 Giỏ hàng của bạn</h2>

        {cart.length > 0 ? (
          <>
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="cart-item-image"
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td className="text-primary fw-bold">{item.product.price} $</td>
                    <td>
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value)}
                      />
                    </td>
                    <td className="text-success fw-bold">
                      {item.product.price * item.quantity} $
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                        ❌ Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tổng tiền và nút bấm */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="fw-bold text-danger">Tổng tiền: {totalPrice} $</h4>
              <div>
                <Button variant="outline-danger" className="me-2" onClick={clearCart}>
                  🗑 Xóa tất cả
                </Button>
                <Button variant="success">💳 Thanh toán</Button>
              </div>
            </div>
          </>
        ) : (
          <h5 className="text-center text-muted">🛍 Giỏ hàng trống</h5>
        )}

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-outline-primary">
            ⬅ Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
