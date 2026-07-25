import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllOrdersOfUser } from "../../redux/actions/order.js";
import Loader from "../Common/Loader.jsx";

const AllRefundOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const refundOrders =
    orders?.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success",
    ) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-copper font-body">
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
          <Link to={`/user/order/${params.row.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} className="text-voltage" />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows =
    refundOrders?.map((item) => ({
      id: item._id,
      itemsQty:
        item.cart?.reduce((sum, cartItem) => sum + (cartItem.qty || 1), 0) || 0,
      total: `US$ ${item.totalPrice || 0}`,
      status: item.status || "Processing refund",
    })) || [];

  return (
    <div className="w-full">
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
          "& .MuiDataGrid-cell": {
            fontFamily: "Inter, sans-serif",
          },
          "& .greenColor": { color: "#1FAA59", fontWeight: "bold" },
          "& .orangeColor": { color: "#F5A623", fontWeight: "bold" },
        }}
      />
    </div>
  );
};

export default AllRefundOrders;