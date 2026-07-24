import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Common/Loader.jsx";
import ProductCard from "../../components/Products/ProductCard.jsx";
import styles from "../../styles/styles.js";
import { getAllProducts } from "../../redux/actions/product.js";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.user);
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
        const d = allProducts.filter((i) => i.category === categoryData);
        setData(d);
      }
    }
  }, [allProducts, categoryData]);

  return (
    <>
      <div>
        <br />
        <br />
        <div className={`${styles.section}`}>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          ) : (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
