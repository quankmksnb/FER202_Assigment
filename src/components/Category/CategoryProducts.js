import "./category.css";
import { useContext, useEffect } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { CartContext } from "../../context/CartContext";
import { useParams, Link } from "react-router-dom";

const CategoryProducts = () => {
    const { setSelectedCategory, products, categories } = useContext(CategoryContext);
    const { addToCart } = useContext(CartContext);
    const { categoryId } = useParams();

    useEffect(() => {
        setSelectedCategory(parseInt(categoryId));
    }, [categoryId, setSelectedCategory]);

    const category = categories.find(cat => cat.id === parseInt(categoryId));

    return (
        <div className="category-container">
            <h2 className="category-title">Products Of Category: {category ? category.name : "Unknown"}</h2>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name"> {product.name}</h3>
                            <p className="product-price">Price: {product.price} $</p>
                            <div className="d-flex justify-content-center">
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
                    ))}
                </div>
            ) : (
                <p className="no-products">Không có sản phẩm nào</p>
            )}
        </div>
    );
};

export default CategoryProducts;
