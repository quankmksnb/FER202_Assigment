import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyShopProduct = () => {
  const { id } = useParams(); // Lấy userId từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/products?salerId=${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

  const handleUpdate = (productId, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  const saveChanges = (product) => {
    axios
      .put(`http://localhost:9999/products/${product.id}`, product)
      .then(() => alert("Cập nhật thành công!"))
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Quản lý sản phẩm của bạn</h2>
      {products.length > 0 ? (
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá ($)</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-thumbnail"
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleUpdate(product.id, "name", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleUpdate(product.id, "price", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => handleUpdate(product.id, "description", e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => saveChanges(product)}>
                    Lưu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default MyShopProduct;