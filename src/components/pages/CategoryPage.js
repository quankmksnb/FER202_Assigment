import React from "react";
import { useParams } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "iPhone 13", category: "electronics" },
  { id: 2, name: "Nike Shoes", category: "fashion" },
  { id: 3, name: "Face Cream", category: "health & beauty" },
  { id: 4, name: "Car Engine", category: "motors" },
  { id: 5, name: "Antique Coin", category: "collectibles" },
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === categoryName
  );

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
