import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { getAllOrdersOfUser } from "../../redux/actions/order.js";
import Loader from "../Common/Loader.jsx";

const TrackOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);

  // Fetch orders only if user exists
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="pl-8 pt-1 flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="pl-8 pt-1 text-center text-red-500">
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
      cellClassName: (params) => {
        const status = params.row.status;
        if (status === "Delivered") return "greenColor";
        if (status === "Processing refund" || status === "Refund Success")
          return "orangeColor";
        return "redColor";
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
      minWidth: 130,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/user/track/order/${params.row.id}`}>
            <Button>
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  // Map orders to rows with total quantity (sum of qty)
  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty:
        item.cart?.reduce((sum, cartItem) => sum + (cartItem.qty || 1), 0) || 0,
      total: `US$ ${item.totalPrice || 0}`,
      status: item.status || "Processing",
    })) || [];

  return (
    <div className="pl-8 pt-1">
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

export default TrackOrder;
