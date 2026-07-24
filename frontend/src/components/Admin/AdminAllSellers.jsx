// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DataGrid } from "@material-ui/data-grid";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { Button } from "@material-ui/core";
// import styles from "../../styles/styles";
// import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { getAllSellers } from "../../redux/actions/sellers";
// import { Link } from "react-router-dom";

// const AdminAllSellers = () => {
//   const dispatch = useDispatch();
//   const { sellers } = useSelector((state) => state.seller);
//   const [open, setOpen] = useState(false);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     dispatch(getAllSellers());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     await axios
//     .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
//     .then((res) => {
//       toast.success(res.data.message);
//     });

//   dispatch(getAllSellers());
//   };

//   const columns = [
//     { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "name",
//       headerName: "name",
//       minWidth: 130,
//       flex: 0.7,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       type: "text",
//       minWidth: 130,
//       flex: 0.7,
//     },
//     {
//       field: "address",
//       headerName: "Seller Address",
//       type: "text",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "joinedAt",
//       headerName: "joinedAt",
//       type: "text",
//       minWidth: 130,
//       flex: 0.8,
//     },
//     {
//         field: "  ",
//         flex: 1,
//         minWidth: 150,
//         headerName: "Preview Shop",
//         type: "number",
//         sortable: false,
//         renderCell: (params) => {
//           return (
//             <>
//             <Link to={`/shop/preview/${params.id}`}>
//             <Button>
//                 <AiOutlineEye size={20} />
//               </Button>
//             </Link>
//             </>
//           );
//         },
//       },
//     {
//       field: " ",
//       flex: 1,
//       minWidth: 150,
//       headerName: "Delete Seller",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Button onClick={() => setUserId(params.id) || setOpen(true)}>
//               <AiOutlineDelete size={20} />
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];
//   sellers &&
//   sellers.forEach((item) => {
//       row.push({
//         id: item._id,
//         name: item?.name,
//         email: item?.email,
//         joinedAt: item.createdAt.slice(0, 10),
//         address: item.address,
//       });
//     });

//   return (
//     <div className="w-full flex justify-center pt-5">
//       <div className="w-[97%]">
//         <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
//         <div className="w-full min-h-[45vh] bg-white rounded">
//           <DataGrid
//             rows={row}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             autoHeight
//           />
//         </div>
//         {open && (
//           <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
//             <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
//               <div className="w-full flex justify-end cursor-pointer">
//                 <RxCross1 size={25} onClick={() => setOpen(false)} />
//               </div>
//               <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
//                 Are you sure you wanna delete this user?
//               </h3>
//               <div className="w-full flex items-center justify-center">
//                 <div
//                   className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
//                   onClick={() => setOpen(false)}
//                 >
//                   cancel
//                 </div>
//                 <div
//                   className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
//                   onClick={() =>  setOpen(false) || handleDelete(userId)}
//                 >
//                   confirm
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminAllSellers;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import { axiosServerInstance } from "../../server.js";
import { getAllSellers } from "../../redux/actions/seller.js";
import Loader from "../Common/Loader.jsx";

const AdminAllSellers = () => {
  const dispatch = useDispatch();
  const { sellers, sellersLoading,sellersError  } = useSelector(
    (state) => state.seller,
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch sellers on mount
  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  // Delete seller handler
  const handleDelete = async () => {
    if (!selectedSellerId) return;

    setIsDeleting(true);
    try {
      await axiosServerInstance.delete(
        `/shop/delete-seller/${selectedSellerId}`,
      );
      toast.success("Seller deleted successfully!");
      dispatch(getAllSellers());
      setOpenDeleteModal(false);
      setSelectedSellerId("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete seller");
    } finally {
      setIsDeleting(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteConfirmation = (id) => {
    setSelectedSellerId(id);
    setOpenDeleteModal(true);
  };

  // Close delete confirmation modal
  const closeDeleteConfirmation = () => {
    setOpenDeleteModal(false);
    setSelectedSellerId("");
  };

  // DataGrid Columns (v7+ compatible)
  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 0.9,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 180,
      flex: 0.9,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "string",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "preview",
      flex: 0.6,
      minWidth: 120,
      headerName: "Preview",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/shop/preview/${params.row.id}`}>
            <Button>
              <AiOutlineEye
                size={20}
                className="text-blue-500 hover:text-blue-700"
              />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      flex: 0.6,
      minWidth: 120,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => openDeleteConfirmation(params.row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Map rows
  const rows =
    sellers?.map((item) => ({
      id: item._id,
      name: item.name || "N/A",
      email: item.email || "N/A",
      address: item.address || "N/A",
      joinedAt: item.createdAt?.slice(0, 10) || "N/A",
    })) || [];

  // Loading state
  if (sellersLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Error state
  if (sellersError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load sellers: {sellersError}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div className="w-full min-h-[45vh] bg-white rounded shadow-sm p-2">
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
      </div>

      {/* Delete Confirmation Modal */}
      {openDeleteModal && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow-lg p-6">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1
                size={25}
                onClick={closeDeleteConfirmation}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              />
            </div>
            <h3 className="text-[22px] text-center py-4 font-Poppins text-[#000000cb]">
              Are you sure you want to delete this seller?
            </h3>
            <p className="text-center text-gray-500 text-sm mb-4">
              This will also remove all products associated with this shop.
            </p>
            <div className="w-full flex items-center justify-center gap-4">
              <button
                className={`${styles.button} !bg-gray-400 text-white text-[16px] !h-[42px] px-6 hover:!bg-gray-500 transition-colors`}
                onClick={closeDeleteConfirmation}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} text-white text-[16px] !h-[42px] px-6 ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllSellers;
