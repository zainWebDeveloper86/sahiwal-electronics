// import React, { useEffect, useState } from "react";
// import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
// import styles from "../../styles/styles.js";
// import { Link } from "react-router-dom";
// import { MdBorderClear } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfShop } from "../../redux/actions/order.js";
// import { getAllProductsShop } from "../../redux/actions/product.js";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";



// const SellerDashboardHero = () => {
//   const dispatch = useDispatch();
//   const { orders } = useSelector((state) => state.orders);
//   const { seller } = useSelector((state) => state.seller);
//   const { products } = useSelector((state) => state.products);

//   useEffect(() => {
//      dispatch(getAllOrdersOfShop(seller._id));
//      dispatch(getAllProductsShop(seller._id));
//   }, [dispatch]);

//   const availableBalance = seller?.availableBalance.toFixed(2);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//     },

//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/dashboard/order/${params.id}`}>
//               <Button>
//                 <AiOutlineArrowRight size={20} />
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];

//   orders && orders.forEach((item) => {
//     row.push({
//         id: item._id,
//         itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
//         total: "US$ " + item.totalPrice,
//         status: item.status,
//       });
//   });
//   return (
//     <div className="w-full p-8">
//       <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
//       <div className="w-full block 800px:flex items-center justify-between">
//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <AiOutlineMoneyCollect
//               size={30}
//               className="mr-2"
//               fill="#00000085"
//             />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               Account Balance{" "}
//               <span className="text-[16px]">(with 10% service charge)</span>
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance}</h5>
//           <Link to="/dashboard-withdraw-money">
//             <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
//           </Link>
//         </div>

//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <MdBorderClear size={30} className="mr-2" fill="#00000085" />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               All Orders
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
//           <Link to="/dashboard-orders">
//             <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
//           </Link>
//         </div>

//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <AiOutlineMoneyCollect
//               size={30}
//               className="mr-2"
//               fill="#00000085"
//             />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               All Products
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
//           <Link to="/dashboard-products">
//             <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
//           </Link>
//         </div>
//       </div>
//       <br />
//       <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
//       <div className="w-full min-h-[45vh] bg-white rounded">
//       <DataGrid
//         rows={row}
//         columns={columns}
//         pageSize={10}
//         disableSelectionOnClick
//         autoHeight
//       />
//       </div>
//     </div>
//   );
// };

// export default SellerDashboardHero;

import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order.js";
import { getAllProductsShop } from "../../redux/actions/product.js";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Common/Loader.jsx";

const SellerDashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { products, loading: productsLoading } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (seller?._id) {
      Promise.all([
        dispatch(getAllOrdersOfShop(seller._id)),
        dispatch(getAllProductsShop(seller._id)),
      ]).finally(() => setIsLoading(false));
    }
  }, [dispatch, seller?._id]);

  // ✅ Handle loading state
  if (isLoading || ordersLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // ✅ Safe balance with fallback
  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00";

  // ✅ Safely calculate total items quantity
  const getTotalItemsQty = (cart) => {
    return cart?.reduce((acc, item) => acc + (item.qty || 1), 0) || 0;
  };

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

  // ✅ Map orders to rows with total quantity (sum of qty)
  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: getTotalItemsQty(item.cart),
      total: `US$ ${item.totalPrice || 0}`,
      status: item.status || "Processing",
    })) || [];

  return (
    <div className="w-full p-8">
      {/* Header */}
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>

      {/* Stats Cards */}
      <div className="w-full block 800px:flex items-center justify-between gap-4">
        {/* Balance Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c] hover:underline cursor-pointer">
              Withdraw Money
            </h5>
          </Link>
        </div>

        {/* Orders Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders?.length || 0}
          </h5>
          <Link to="/dashboard-all-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline cursor-pointer">
              View Orders
            </h5>
          </Link>
        </div>

        {/* Products Card */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products?.length || 0}
          </h5>
          <Link to="/dashboard-all-products">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline cursor-pointer">
              View Products
            </h5>
          </Link>
        </div>
      </div>

      <br />

      {/* Latest Orders Table */}
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded shadow">
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
    </div>
  );
};

export default SellerDashboardHero;