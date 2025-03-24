import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import axios from "axios";

const AddProduct = () => {
  const { products, setProducts } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:9999/products", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: "", image: "", description: "", category: "" });
      alert("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Thêm Sản Phẩm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm:</label>
            <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Giá:</label>
            <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Hình ảnh (URL):</label>
            <input type="text" className="form-control" name="image" value={newProduct.image} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả:</label>
            <textarea className="form-control" name="description" value={newProduct.description} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Danh mục:</label>
            <select className="form-select" name="category" value={newProduct.category} onChange={handleChange} required>
              <option value="">Chọn danh mục</option>
              {categories.map((category, index) => (
                category !== "all" && <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Thêm sản phẩm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;