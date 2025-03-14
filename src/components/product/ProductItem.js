import React from "react";

const ProductItem = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={`/images/${product.image}`} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
};

export default ProductItem;
