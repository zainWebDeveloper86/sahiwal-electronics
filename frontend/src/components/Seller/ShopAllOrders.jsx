import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order.js";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Common/Loader.jsx";

const ShopAllOrders = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  if (loading) {
    return (
      <div className="w-full mx-8 pt-1 mt-10 flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-8 pt-1 mt-10 text-center text-copper font-body">
        <p>Failed to load orders: {error}</p>
      </div>
    );
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => (params.row.status === "Delivered" ? "greenColor" : "redColor"),
    },
    { field: "itemsQty", headerName: "Total Items", type: "number", minWidth: 130, flex: 0.7 },
    { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/order/${params.row.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} className="text-voltage" />
          </Button>
        </Link>
      ),
    },
  ];

  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart?.reduce((sum, cartItem) => sum + (cartItem.qty || 1), 0) || 0,
      total: `US$ ${item.totalPrice || 0}`,
      status: item.status || "Processing",
    })) || [];

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white border border-divider rounded-lg">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          "& .greenColor": { color: "#1FAA59", fontWeight: "bold" },
          "& .redColor": { color: "#131A2B", fontWeight: "bold" },
        }}
      />
    </div>
  );
};

export default ShopAllOrders;