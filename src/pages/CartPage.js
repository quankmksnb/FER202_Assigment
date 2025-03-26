import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { InputNumber } from "antd";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart.css";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showQR, setShowQR] = useState(false);

  const VND_EXCHANGE_RATE = 24000; // bạn có thể chỉnh tỉ giá
  const bidvAccount = "4831020728";

  const totalPriceUSD = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  const totalPriceVND = totalPriceUSD * VND_EXCHANGE_RATE;

  const handleSelectItem = (itemId, checked) => {
    setSelectedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cart.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const isAllSelected = selectedItems.length === cart.length && cart.length > 0;

  const handleShowQR = () => {
    if (selectedItems.length > 0) {
      setShowQR(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🛒 Giỏ hàng của bạn</h2>

        {cart.length > 0 ? (
          <>
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
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
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) =>
                          handleSelectItem(item.id, e.target.checked)
                        }
                      />
                    </td>
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
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="fw-bold text-danger">
                Tổng tiền: {totalPriceUSD} $ (~ {totalPriceVND.toLocaleString()} VND)
              </h4>
              <div>
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={clearCart}
                >
                  🗑 Xóa tất cả
                </Button>
                <Button
                  variant="success"
                  disabled={selectedItems.length === 0}
                  onClick={handleShowQR}
                >
                  💳 Thanh toán
                </Button>
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

      {/* Modal QR */}
      <Modal show={showQR} onHide={() => setShowQR(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>QR Payment - BIDV</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Chuyển khoản tới tài khoản BIDV: <strong>{bidvAccount}</strong></p>
          <p>Số tiền: <strong>{totalPriceVND.toLocaleString()} VND</strong></p>
          <p>Nội dung: <strong>Thanh toán đơn hàng</strong></p>
          <img
            src={`https://img.vietqr.io/image/BIDV-${bidvAccount}-compact2.png?amount=${totalPriceVND}&addInfo=Thanh+toan+don+hang`}
            alt="VietQR BIDV"
            width="250"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQR(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
