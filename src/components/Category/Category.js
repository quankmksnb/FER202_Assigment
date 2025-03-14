import React from "react";
import CategoryTop from "../CategoryTop/CategoryTop";
import "./category.css";
import catOne from "../constant/categoryOne";

const Category = () => {
  return (
    <div id="conatainer">
      <CategoryTop />
      <div className="cat">
        {catOne.map((data, index) => (
          <div className="circle-section" key={index}>
            <div className="image-cicle">
              <img src={data.imgUrl} alt={data.title} />
            </div>
            <p>{data.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
