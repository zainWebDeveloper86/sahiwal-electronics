import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data, currentProduct }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (allProducts && data) {
      const targetCategory = data.category?.trim().toLowerCase();

      const d = allProducts.filter(
        (i) =>
          i.category?.trim().toLowerCase() === targetCategory &&
          i._id !== currentProduct,
      );
      setProducts(d);
    }
  }, [data, currentProduct, allProducts]);

  if (!data) return null;

  return (
    <div className={`p-4 ${styles.section}`}>
      <h2 className="font-display font-[600] text-[22px] text-ink border-b border-divider pb-3 mb-5">
        Related Products
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {products.map((i) => (
            <ProductCard data={i} key={i._id} />
          ))}
        </div>
      ) : (
        <p className="text-ink/50 font-body text-sm pb-8">
          No related products in this category yet.
        </p>
      )}
    </div>
  );
};

export default SuggestedProduct;