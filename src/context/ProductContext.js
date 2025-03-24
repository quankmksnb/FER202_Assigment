import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9999/products");
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : data.products);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts,searchText, setSearchText }}>
      {children}
    </ProductContext.Provider>
  );
};
