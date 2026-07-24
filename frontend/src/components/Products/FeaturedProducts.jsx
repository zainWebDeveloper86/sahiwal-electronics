import React, { useEffect } from "react";
import styles from "../../styles/styles.js";
import ProductCard from "./ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product.js";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length > 0 ? (
            <>
              {allProducts &&
                allProducts.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </>
          ) : (
            <p className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
