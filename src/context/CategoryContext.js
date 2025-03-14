import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9999/categories");
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data.categories);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch sản phẩm dựa vào category_id từ bảng trung gian product_categories
  useEffect(() => {
    if (selectedCategory === null) return;

    const fetchProducts = async () => {
      try {
        // Lấy danh sách product_id theo category_id từ bảng product_categories
        const responseCategories = await fetch(`http://localhost:9999/product_categories?category_id=${selectedCategory}`);
        const productCategories = await responseCategories.json();

        if (!Array.isArray(productCategories)) {
          console.error("Dữ liệu product_categories không hợp lệ");
          return;
        }

        // Lọc danh sách product_id từ product_categories (chuyển thành kiểu Number)
        const productIds = productCategories.map(pc => Number(pc.product_id));

        // Fetch danh sách sản phẩm từ API
        const responseProducts = await fetch("http://localhost:9999/products");
        const allProducts = await responseProducts.json();

        // Lọc sản phẩm phù hợp với product_id đã lấy (chuyển thành kiểu Number)
        const filteredProducts = allProducts.filter(product => productIds.includes(Number(product.id)));

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <CategoryContext.Provider value={{ categories, selectedCategory, setSelectedCategory, products }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
