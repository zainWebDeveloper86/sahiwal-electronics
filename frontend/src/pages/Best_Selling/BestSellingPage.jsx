import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Common/Loader.jsx";
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
      const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);   // 👈 sold_out, total_sell nahi
      setData(sortedData);
    }
  }, [allProducts]);

  return (
    <>
      <div>
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingPage;
