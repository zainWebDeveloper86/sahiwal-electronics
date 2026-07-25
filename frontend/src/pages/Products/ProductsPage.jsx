import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Products/ProductCard.jsx";
import styles from "../../styles/styles.js";
import { getAllProducts } from "../../redux/actions/product.js";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      if (categoryData === null) {
        setData(allProducts);
      } else {
        setData(allProducts.filter((i) => i.category === categoryData));
      }
    }
  }, [allProducts, categoryData]);

  return (
    <div>
      <div className={`${styles.section} pt-8`}>
        <h1 className={`${styles.heading}`}>
          {categoryData || "All Products"}
        </h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data.map((i) => (
              <ProductCard data={i} key={i._id} />
            ))}
          </div>
        ) : (
          <h1 className="text-center w-full pb-[100px] text-[18px] font-body text-ink/50">
            No products found!
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;