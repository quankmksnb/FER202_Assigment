import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
