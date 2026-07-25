import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Products/ProductCard.jsx";
import styles from "../../styles/styles.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product.js";

const BestSellingPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      setData([...allProducts].sort((a, b) => b.sold_out - a.sold_out));
    }
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section} pt-8`}>
        <h1 className={`${styles.heading}`}>Best Selling</h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data.map((i) => (
              <ProductCard data={i} key={i._id} />
            ))}
          </div>
        ) : (
          <p className="text-center w-full pb-[100px] text-[18px] font-body text-ink/50">
            No products found!
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSellingPage;