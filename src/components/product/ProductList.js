import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { useParams, Link } from "react-router-dom";


const ProductList = () => {
  const { products = [], searchText = "" } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);


  if (!searchText.trim()) {
    return null;
  }

  if (!Array.isArray(products)) {
    return <p className="text-center text-muted">Dữ liệu sản phẩm không hợp lệ.</p>;
  }

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Danh sách sản phẩm</h2>

      {filteredProducts.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-lg border-0 rounded-4">
                {/* Ảnh sản phẩm với hiệu ứng đẹp hơn */}
                <div className="position-relative">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name || "Sản phẩm"}
                    className="card-img-top rounded-top-4"
                    style={{ height: "250px", width: "90%", marginLeft: "5%", objectFit: "cover" }}
                  />
                </div>

                {/* Nội dung sản phẩm */}
                <div className="card-body text-center">
                  <h5>{product.name || "Không có tên"}</h5>
                  <p className="text-danger fw-semibold fs-5">Price : ${product.price || "N/A"}</p>
                </div>

                {/* Nút hành động - Đẹp hơn với Bootstrap */}
                <div className="card-footer bg-white border-0 pb-3">
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/product/${product.id}`} className="btn btn-primary me-2">View Detail</Link>
                    <button
                      className="btn btn-success"
                      type="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button style={{ marginLeft: "6px" }} className="btn btn-warning" onClick={() => alert(`Buying ${product.name} now!`)}>Buy It Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">❌ Không tìm thấy sản phẩm phù hợp.</p>
      )}
    </div>
  );
};

export default ProductList;
