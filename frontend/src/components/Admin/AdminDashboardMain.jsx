// // import React, { useEffect, useState } from "react";
// // import styles from "../../styles/styles";
// // import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
// // import { MdBorderClear } from "react-icons/md";
// // import { Link } from "react-router-dom";
// // import { DataGrid } from "@mui/x-data-grid";
// // import { Button } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllOrdersOfAdmin } from "../../redux/actions/order.js";
// // import { getAllSellers } from "../../redux/actions/seller.js";
// // import Loader from "../Common/Loader";

// // const AdminDashboardMain = () => {
// //   const dispatch = useDispatch();

// //   const { adminOrders,adminOrderLoading } = useSelector((state) => state.order);
// //   const { sellers } = useSelector((state) => state.seller);

// //   useEffect(() => {
// //     dispatch(getAllOrdersOfAdmin());
// //     dispatch(getAllSellers());
// //   }, []);

// //    const adminEarning = adminOrders && adminOrders.reduce((acc,item) => acc + item.totalPrice * .10, 0);

// //    const adminBalance = adminEarning?.toFixed(2);

// //   const columns = [
// //     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

// //     {
// //       field: "status",
// //       headerName: "Status",
// //       minWidth: 130,
// //       flex: 0.7,
// //       cellClassName: (params) => {
// //         return params.getValue(params.id, "status") === "Delivered"
// //           ? "greenColor"
// //           : "redColor";
// //       },
// //     },
// //     {
// //       field: "itemsQty",
// //       headerName: "Items Qty",
// //       type: "number",
// //       minWidth: 130,
// //       flex: 0.7,
// //     },

// //     {
// //       field: "total",
// //       headerName: "Total",
// //       type: "number",
// //       minWidth: 130,
// //       flex: 0.8,
// //     },
// //     {
// //       field: "createdAt",
// //       headerName: "Order Date",
// //       type: "number",
// //       minWidth: 130,
// //       flex: 0.8,
// //     },
// //   ];

// //   const row = [];
// //   adminOrders &&
// //   adminOrders.forEach((item) => {
// //       row.push({
// //         id: item._id,
// //         itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
// //         total: item?.totalPrice + " $",
// //         status: item?.status,
// //         createdAt: item?.createdAt.slice(0,10),
// //       });
// //     });

// //   return (
// //    <>
// //     {
// //       adminOrderLoading ? (
// //         <Loader />
// //       ) : (
// //         <div className="w-full p-4">
// //         <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
// //         <div className="w-full block 800px:flex items-center justify-between">
// //           <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
// //             <div className="flex items-center">
// //               <AiOutlineMoneyCollect
// //                 size={30}
// //                 className="mr-2"
// //                 fill="#00000085"
// //               />
// //               <h3
// //                 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
// //               >
// //                 Total Earning
// //               </h3>
// //             </div>
// //             <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$ {adminBalance}</h5>
// //           </div>

// //           <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
// //             <div className="flex items-center">
// //               <MdBorderClear size={30} className="mr-2" fill="#00000085" />
// //               <h3
// //                 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
// //               >
// //                 All Sellers
// //               </h3>
// //             </div>
// //             <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
// //             <Link to="/admin-sellers">
// //               <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
// //             </Link>
// //           </div>

// //           <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
// //             <div className="flex items-center">
// //               <AiOutlineMoneyCollect
// //                 size={30}
// //                 className="mr-2"
// //                 fill="#00000085"
// //               />
// //               <h3
// //                 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
// //               >
// //                 All Orders
// //               </h3>
// //             </div>
// //             <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
// //             <Link to="/admin-orders">
// //               <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
// //             </Link>
// //           </div>
// //         </div>

// //         <br />
// //         <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
// //         <div className="w-full min-h-[45vh] bg-white rounded">
// //           <DataGrid
// //             rows={row}
// //             columns={columns}
// //             pageSize={4}
// //             disableSelectionOnClick
// //             autoHeight
// //           />
// //         </div>
// //       </div>
// //       )
// //     }
// //    </>
// //   );
// // };

// // export default AdminDashboardMain;

// import React, { useEffect, useState } from "react";
// import styles from "../../styles/styles";
// import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
// import { MdBorderClear } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../../redux/actions/order.js";
// import { getAllSellers } from "../../redux/actions/seller.js";
// import Loader from "../Common/Loader";

// const AdminDashboardMain = () => {
//   const dispatch = useDispatch();

//   //  Redux states
//   const { adminOrders, adminOrderLoading } = useSelector(
//     (state) => state.orders,
//   );
//   const { sellers, loading: sellerLoading } = useSelector(
//     (state) => state.seller,
//   );

//   //  Fetch data
//   useEffect(() => {
//     dispatch(getAllOrdersOfAdmin());
//     dispatch(getAllSellers());
//   }, [dispatch]);

//   //  Calculate total earning (10% commission)
//   const adminEarning =
//   adminOrders?.reduce(
//       (acc, item) => acc + Number(item?.totalPrice || 0) * 0.1,
//       0,
//     ) || 0;

//     const adminBalance = adminEarning.toFixed(2);

//     //  DataGrid Columns (v7+ compatible)
//     const columns = [
//       { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//       {
//         field: "status",
//         headerName: "Status",
//         minWidth: 130,
//         flex: 0.7,
//       cellClassName: (params) => {
//         return params.row.status === "Delivered" ? "greenColor" : "redColor";
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
//       field: "createdAt",
//       headerName: "Order Date",
//       minWidth: 130,
//       flex: 0.8,
//       type: "string",
//     },
//   ];

//   // Rows mapping
//   const rows =
//   adminOrders?.map((item) => ({
//       id: item._id,
//       itemsQty: item?.cart?.reduce((acc, it) => acc + (it.qty || 0), 0) || 0,
//       total: `${item?.totalPrice || 0} $`,
//       status: item?.status || "Processing",
//       createdAt: item?.createdAt?.slice(0, 10) || "N/A",
//     })) || [];

//     // Loading state
//     if (adminOrderLoading || sellerLoading) {
//       return (
//         <div className="flex justify-center items-center h-[60vh]">
//         <Loader />
//       </div>
//     );
//   }
//   // Loading state
//   if (adminOrderLoading || sellersLoading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-4">
//       <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>

//       {/* Cards */}
//       <div className="w-full block 800px:flex items-center justify-between gap-4">
//         {/* Total Earning */}
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
//               Total Earning
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             $ {adminBalance}
//           </h5>
//         </div>

//         {/* All Sellers */}
//         <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
//           <div className="flex items-center">
//             <MdBorderClear size={30} className="mr-2" fill="#00000085" />
//             <h3
//               className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
//             >
//               All Sellers
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             {sellers?.length || 0}
//           </h5>
//           <Link to="/admin/sellers">
//             <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">
//               View Sellers
//             </h5>
//           </Link>
//         </div>

//         {/* All Orders */}
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
//               All Orders
//             </h3>
//           </div>
//           <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
//             {adminOrders?.length || 0}
//           </h5>
//           <Link to="/admin/orders">
//             <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">
//               View Orders
//             </h5>
//           </Link>
//         </div>
//       </div>

//       <br />

//       {/* Latest Orders Table */}
//       <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
//       <div className="w-full min-h-[45vh] bg-white rounded shadow-sm p-2">
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: { paginationModel: { pageSize: 5 } },
//           }}
//           pageSizeOptions={[5, 10, 25]}
//           disableRowSelectionOnClick
//           autoHeight
//           sx={{
//             "& .greenColor": { color: "#22c55e", fontWeight: "bold" },
//             "& .redColor": { color: "#ef4444", fontWeight: "bold" },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardMain;

import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order.js";
import { getAllSellers } from "../../redux/actions/seller.js";
import Loader from "../Common/Loader";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.orders,
  );

  const { sellers, sellersLoading } = useSelector((state) => state.seller);

  // Fetch data
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  // Calculate total earning (10% commission)
  const adminEarning =
    adminOrders
      ?.filter((item) => item.status === "Delivered")
      ?.reduce((acc, item) => acc + Number(item?.totalPrice || 0) * 0.1, 0) ||
    0;

  const adminBalance = adminEarning.toFixed(2);

  // Columns
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
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
      field: "createdAt",
      headerName: "Order Date",
      minWidth: 130,
      flex: 0.8,
      type: "string",
    },
  ];

  // Rows
  const rows =
    adminOrders?.map((item) => ({
      id: item._id,
      itemsQty: item?.cart?.reduce((acc, it) => acc + (it.qty || 0), 0) || 0,
      total: `${item?.totalPrice || 0} $`,
      status: item?.status || "Processing",
      createdAt: item?.createdAt?.slice(0, 10) || "N/A",
    })) || [];

  if (adminOrderLoading || sellersLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>

      {/* Cards */}
      <div className="w-full block 800px:flex items-center justify-between gap-4">
        {/* Total Earning */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Earning
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            $ {adminBalance}
          </h5>
        </div>

        {/* All Sellers */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Sellers
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {sellers?.length || 0}
          </h5>
          <Link to="/admin/sellers">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">
              View Sellers
            </h5>
          </Link>
        </div>

        {/* All Orders */}
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {adminOrders?.length || 0}
          </h5>
          <Link to="/admin/orders">
            <h5 className="pt-4 pl-2 text-[#077f9c] hover:underline">
              View Orders
            </h5>
          </Link>
        </div>
      </div>

      <br />

      {/* Latest Orders Table */}
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded shadow-sm p-2">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            "& .greenColor": { color: "#22c55e", fontWeight: "bold" },
            "& .redColor": { color: "#ef4444", fontWeight: "bold" },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboardMain;
