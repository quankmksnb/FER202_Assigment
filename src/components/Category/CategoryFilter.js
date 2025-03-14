import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const CategoryFilter = () => {
  const { categories, selectedCategory, handleFilter } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category) => {
    handleFilter(category);
    setIsOpen(false); // Ẩn menu sau khi chọn
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border rounded bg-blue-500 text-white"
      >
        Shop by Category
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded shadow-lg w-48">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
