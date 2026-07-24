import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data, currentProduct }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (allProducts && data) {
      const d = allProducts.filter(
        (i) => i.category === data.category && i._id !== currentProduct, // 👈 _id, id nahi
      );
      setProducts(d);
    }
  }, [data, currentProduct, allProducts]);

  // console.log(data);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
