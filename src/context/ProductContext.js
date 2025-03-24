import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get("http://localhost:9999/products") // API hoặc file JSON
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        const uniqueCategories = ["all", ...new Set(response.data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <ProductContext.Provider value={{ filteredProducts, categories, selectedCategory, products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
