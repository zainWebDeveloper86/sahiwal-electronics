import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductDetails from "../../components/Products/ProductDetails.jsx";
import { getAllProducts } from "../../redux/actions/product.js";
import { getAllEvents } from "../../redux/actions/event.js";
import SuggestedProduct from "../../components/Products/SuggestedProduct.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Common/Loader.jsx";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProducts());
    }

    if (isEvent !== null && !allEvents) {
      dispatch(getAllEvents());
    }
  }, [dispatch, allProducts, allEvents, isEvent]);

  useEffect(() => {
    if (isEvent !== null) {
      const eventFound = allEvents?.find((i) => i._id === id);
      if (eventFound) setData(eventFound);
    } else {
      const productFound = allProducts?.find((i) => i._id === id);
      if (productFound) setData(productFound);
    }
  }, [id, allProducts, allEvents, isEvent]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-gray-500 text-lg">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} currentProduct={id} />}
    </div>
  );
};

export default ProductDetailsPage;
