// // import { DataGrid } from "@mui/x-data-grid";
// // import { Button } from "@mui/material";
// // import React, { useEffect } from "react";
// // import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import {
// //   deleteEventShop,
// //   getAllEventsShop,
// // } from "../../redux/actions/event.js";
// // import Loader from "../Common/Loader.jsx";
// // import { toast } from "react-toastify";

// // const ShopAllEvents = () => {
// //   const { events, loading,message,error } = useSelector((state) => state.events);
// //   // console.log(events)
// //   const { seller } = useSelector((state) => state.seller);

// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     if (seller?._id) {
// //       dispatch(getAllEventsShop(seller._id));
// //     }
// //   }, [dispatch, seller]);

// //   useEffect(() => {
// //     if (message) {
// //       toast.success(message);
// //       dispatch(getAllEventsShop(seller._id));
// //       dispatch({ type: "ClearEventDeleteMessage" });
// //     }
// //     if (error) {
// //       toast.error(error);
// //       dispatch({ type: "ClearEventErrors" });
// //     }
// //   }, [message, error, dispatch, seller]);

// //   const handleDelete = (id) => {
// //     dispatch(deleteEventShop(id));
// //   };

// //   const columns = [
// //     { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
// //     {
// //       field: "name",
// //       headerName: "Name",
// //       minWidth: 180,
// //       flex: 1.4,
// //     },
// //     {
// //       field: "price",
// //       headerName: "Price",
// //       minWidth: 100,
// //       flex: 0.6,
// //     },
// //     {
// //       field: "Stock",
// //       headerName: "Stock",
// //       type: "number",
// //       minWidth: 80,
// //       flex: 0.5,
// //     },

// //     {
// //       field: "sold",
// //       headerName: "Sold out",
// //       type: "number",
// //       minWidth: 130,
// //       flex: 0.6,
// //     },
// //     {
// //       field: "Preview",
// //       flex: 0.8,
// //       minWidth: 100,
// //       headerName: "",
// //       type: "number",
// //       sortable: false,
// //       renderCell: (params) => {
// //         const d = params.row.name;
// //         const product_name = d.replace(/\s+/g, "-");
// //         return (
// //           <>
// //             <Link to={`/product/${product_name}`}>
// //               <Button>
// //                 <AiOutlineEye size={20} />
// //               </Button>
// //             </Link>
// //           </>
// //         );
// //       },
// //     },
// //     {
// //       field: "Delete",
// //       flex: 0.8,
// //       minWidth: 120,
// //       headerName: "",
// //       type: "number",
// //       sortable: false,
// //       renderCell: (params) => {
// //         return (
// //           <>
// //             <Button onClick={() => handleDelete(params.id)}>
// //               <AiOutlineDelete size={20} />
// //             </Button>
// //           </>
// //         );
// //       },
// //     },
// //   ];

// //   const row = [];

// //   events &&
// //     events.forEach((item) => {
// //       row.push({
// //         id: item._id,
// //         name: item.name,
// //         price: "US$ " + item.discountPrice,
// //         Stock: item.stock,
// //         sold: item.sold_out,
// //       });
// //     });

// //   return (
// //     <>
// //       {loading ? (
// //         <Loader />
// //       ) : (
// //         <div className="w-full mx-8 pt-1 mt-10 bg-white">
// //           <DataGrid
// //             rows={row}
// //             columns={columns}
// //             pageSize={10}
// //             disableSelectionOnClick
// //             autoHeight
// //           />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default ShopAllEvents;


// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";
// import React, { useEffect } from "react";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   deleteEventShop,
//   getAllEventsShop,
// } from "../../redux/actions/event.js";
// import Loader from "../Common/Loader.jsx";
// import { toast } from "react-toastify";

// const ShopAllEvents = () => {
//   const { events, loading, message, error } = useSelector((state) => state.events);
//   const { seller } = useSelector((state) => state.seller);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (seller?._id) {
//       dispatch(getAllEventsShop(seller._id));
//     }
//   }, [dispatch, seller]);

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//       dispatch(getAllEventsShop(seller._id));
//       dispatch({ type: "ClearEventDeleteMessage" });
//     }
//     if (error) {
//       toast.error(error);
//       dispatch({ type: "ClearEventErrors" });
//     }
//   }, [message, error, dispatch, seller]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       dispatch(deleteEventShop(id));
//     }
//   };

//   const columns = [
//     { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 180,
//       flex: 1.4,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       minWidth: 100,
//       flex: 0.6,
//     },
//     {
//       field: "Stock",
//       headerName: "Stock",
//       type: "number",
//       minWidth: 80,
//       flex: 0.5,
//     },
//     {
//       field: "sold",
//       headerName: "Sold out",
//       type: "number",
//       minWidth: 130,
//       flex: 0.6,
//     },
//     {
//       field: "preview",
//       flex: 0.8,
//       minWidth: 100,
//       headerName: "",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Link to={`/product/${params.row.id}?isEvent=true`}>
//             <Button>
//               <AiOutlineEye size={20} />
//             </Button>
//           </Link>
//         );
//       },
//     },
//     {
//       field: "delete",
//       flex: 0.8,
//       minWidth: 120,
//       headerName: "",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Button onClick={() => handleDelete(params.row.id)}>
//             <AiOutlineDelete size={20} />
//           </Button>
//         );
//       },
//     },
//   ];

//   const rows =
//     events?.map((item) => ({
//       id: item._id,
//       name: item.name,
//       price: `US$ ${item.discountPrice}`,
//       Stock: item.stock,
//       sold: item.sold_out || 0,
//     })) || [];

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="w-full mx-8 pt-1 mt-10 bg-white">
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: { paginationModel: { pageSize: 10 } },
//             }}
//             pageSizeOptions={[5, 10, 25]}
//             disableRowSelectionOnClick
//             autoHeight
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default ShopAllEvents;

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEventShop,
  getAllEventsShop,
} from "../../redux/actions/event.js";
import Loader from "../Common/Loader.jsx";
import { toast } from "react-toastify";

const ShopAllEvents = () => {
  const { events, loading, message, error } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(getAllEventsShop(seller._id));
      dispatch({ type: "ClearEventDeleteMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearEventErrors" });
    }
  }, [message, error, dispatch, seller]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEventShop(id));
    }
  };

  // Helper: check if an event's end date has already passed
  const isEventExpired = (finishDate) => {
    if (!finishDate) return false;
    return new Date(finishDate).getTime() - new Date().getTime() <= 0;
  };

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
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
      field: "status",
      headerName: "Status",
      minWidth: 110,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => {
        const expired = params.row.expired;
        return (
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              expired
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {expired ? "Expired" : "Active"}
          </span>
        );
      },
    },
    {
      field: "preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.row.id}?isEvent=true`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.row.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const rows =
    events?.map((item) => ({
      id: item._id,
      name: item.name,
      price: `US$ ${item.discountPrice}`,
      Stock: item.stock,
      sold: item.sold_out || 0,
      expired: isEventExpired(item.Finish_Date),
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
          />
        </div>
      )}
    </>
  );
};

export default ShopAllEvents;