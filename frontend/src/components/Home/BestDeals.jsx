import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import ProductCard from "../Products/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product.js";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      const sortedData = [...allProducts].sort(
        (a, b) => b.sold_out - a.sold_out,
      );
      setData(sortedData.slice(0, 5));
    }
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.length > 0 ? (
            data.map((i) => <ProductCard data={i} key={i._id} />)
          ) : (
            <p className="text-center w-full pb-[100px] text-[20px] font-body text-ink/60">
              No products found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;