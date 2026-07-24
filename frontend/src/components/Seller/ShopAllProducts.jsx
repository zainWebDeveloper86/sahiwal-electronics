import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product.js";
import { deleteProductShop } from "../../redux/actions/product.js";
import Loader from "../Common/Loader.jsx";
import { toast } from "react-toastify";

const ShopAllProducts = () => {
  const { products, loading, message, error } = useSelector(
    (state) => state.products,
  );
  const { seller } = useSelector((state) => state.seller);
  // console.log(products)
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProductShop(id));
  };

  // Initial fetch — component mount hote hi products laao
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  // Delete ke baad feedback + refresh
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllProductsShop(seller._id));
      dispatch({ type: "ClearProductDeleteMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearProductErrors" });
    }
  }, [message, error, dispatch, seller]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default ShopAllProducts;
