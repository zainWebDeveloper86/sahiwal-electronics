import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

const CouponTable = ({ coupons, onDelete }) => {
  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => onDelete(params.id)}>
            <AiOutlineDelete size={20} className="text-red-500 hover:text-red-700" />
          </Button>
        );
      },
    },
  ];

  const rows = coupons?.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.value + " %",
  })) || [];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      autoHeight
    />
  );
};

export default CouponTable;