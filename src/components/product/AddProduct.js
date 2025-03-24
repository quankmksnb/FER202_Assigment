import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import axios from "axios";

const AddProduct = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);

  const [userId, setUserId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
    category_id: "", // Chỉ lưu category_id
    salerId: null, 
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  // Lấy userId khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setNewProduct((prev) => ({ ...prev, salerId: user.id }));
    }
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Xử lý upload ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        image: "/" + file.name,
      });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Kiểm tra dữ liệu trước khi gửi
  const validateForm = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
      setMessage("❌ Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    if (!userId) {
      setMessage("❌ Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm!");
      return false;
    }
    if (newProduct.price <= 0) {
      setMessage("❌ Giá sản phẩm phải lớn hơn 0!");
      return false;
    }
    return true;
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("🔹 Dữ liệu gửi lên API:", newProduct);

      // 1️⃣ Thêm sản phẩm vào bảng products
      const productResponse = await axios.post("http://localhost:9999/products", {
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        description: newProduct.description,
        salerId: userId,
      });

      const productId = productResponse.data.id; // Lấy product_id từ API response
      console.log("✅ Sản phẩm đã thêm, ID:", productId);

      // 2️⃣ Thêm dữ liệu vào bảng product_categories
      await axios.post("http://localhost:9999/product_categories", {
        product_id: productId,
        category_id: newProduct.category_id, // Đảm bảo đúng key
      });

      console.log("✅ Danh mục đã được liên kết!");

      // Cập nhật danh sách sản phẩm
      setProducts([...products, productResponse.data]);

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        image: null,
        description: "",
        category_id: "",
        salerId: userId,
      });
      setPreviewImage(null);
      setMessage("✅ Thêm sản phẩm thành công!");

    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error.response ? error.response.data : error);
      setMessage("❌ Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Thêm Sản Phẩm</h2>

        {message && <div className={`alert ${message.includes("❌") ? "alert-danger" : "alert-success"}`}>{message}</div>}

        {!userId ? (
          <div className="alert alert-warning text-center">
            ⚠️ Bạn chưa đăng nhập! Vui lòng đăng nhập để thêm sản phẩm.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên sản phẩm:</label>
              <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Giá:</label>
              <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleChange} min="1" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Hình ảnh:</label>
              <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
              {previewImage && <img src={previewImage} alt="Xem trước" className="img-thumbnail mt-2" width="150" />}
            </div>

            <div className="mb-3">
              <label className="form-label">Mô tả:</label>
              <textarea className="form-control" name="description" value={newProduct.description} onChange={handleChange}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Danh mục:</label>
              <select className="form-select" name="category_id" value={newProduct.category_id} onChange={handleChange} required>
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Thêm sản phẩm
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
