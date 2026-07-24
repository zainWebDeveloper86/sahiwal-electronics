import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Common/Loader";

const ShopAllRefundOrders = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  // Filter only refund-related orders
  const refundOrders =
    orders?.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    ) || [];

  // Handle loading state
  if (loading) {
    return (
      <div className="w-full mx-8 pt-1 mt-10 flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full mx-8 pt-1 mt-10 text-center text-red-500">
        <p>Failed to load refund orders: {error}</p>
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
      cellClassName: (params) => {
        return params.row.status === "Refund Success"
          ? "greenColor"
          : "orangeColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Total Items",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/shop/order/${params.row.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  // Map rows with total quantity (sum of qty)
  const rows =
    refundOrders?.map((item) => ({
      id: item._id,
      itemsQty:
        item.cart?.reduce((sum, cartItem) => sum + (cartItem.qty || 1), 0) || 0,
      total: `US$ ${item.totalPrice || 0}`,
      status: item.status || "Processing refund",
    })) || [];

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          "& .greenColor": { color: "#22c55e", fontWeight: "bold" },
          "& .orangeColor": { color: "#f59e0b", fontWeight: "bold" },
          "& .redColor": { color: "#ef4444", fontWeight: "bold" },
        }}
      />
    </div>
  );
};

export default ShopAllRefundOrders;