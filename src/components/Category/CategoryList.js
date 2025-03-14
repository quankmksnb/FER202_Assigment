import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";
import "./category.css";

const CategoryList = () => {
  const { categories, setSelectedCategory } = useContext(CategoryContext);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Cập nhật category đã chọn
  };

  return (
    <div className="category-list">
      <ul>
        {categories.map((category) => (
          <li 
            key={category.id} 
            className="p-3 text-gray-700 cursor-pointer hover:bg-gray-200 transition-all rounded-lg"
            onClick={() => handleCategoryClick(category.id)} 
          >
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
