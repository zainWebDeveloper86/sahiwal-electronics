// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { server } from "../../server";
// import { Link } from "react-router-dom";
// import { DataGrid } from "@material-ui/data-grid";
// import { BsPencil } from "react-icons/bs";
// import { RxCross1 } from "react-icons/rx";
// import styles from "../../styles/styles";
// import { toast } from "react-toastify";

// const AdminAllWithdraws = () => {
//   const [data, setData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [withdrawData, setWithdrawData] = useState();
//   const [withdrawStatus,setWithdrawStatus] = useState('Processing');

//   useEffect(() => {
//     axios
//       .get(`${server}/withdraw/get-all-withdraw-request`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setData(res.data.withdraws);
//       })
//       .catch((error) => {
//         console.log(error.response.data.message);
//       });
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
//     {
//       field: "name",
//       headerName: "Shop Name",
//       minWidth: 180,
//       flex: 1.4,
//     },
//     {
//       field: "shopId",
//       headerName: "Shop Id",
//       minWidth: 180,
//       flex: 1.4,
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       minWidth: 100,
//       flex: 0.6,
//     },
//     {
//       field: "status",
//       headerName: "status",
//       type: "text",
//       minWidth: 80,
//       flex: 0.5,
//     },
//     {
//       field: "createdAt",
//       headerName: "Request given at",
//       type: "number",
//       minWidth: 130,
//       flex: 0.6,
//     },
//     {
//       field: " ",
//       headerName: "Update Status",
//       type: "number",
//       minWidth: 130,
//       flex: 0.6,
//       renderCell: (params) => {

//         return (
//           <BsPencil
//             size={20}
//             className={`${params.row.status !== "Processing" ? 'hidden' : '' } mr-5 cursor-pointer`}
//             onClick={() => setOpen(true) || setWithdrawData(params.row)}
//           />
//         );
//       },
//     },
//   ];

//   const handleSubmit = async () => {
//     await axios
//       .put(`${server}/withdraw/update-withdraw-request/${withdrawData.id}`,{
//         sellerId: withdrawData.shopId,
//       },{withCredentials: true})
//       .then((res) => {
//         toast.success("Withdraw request updated successfully!");
//         setData(res.data.withdraws);
//         setOpen(false);
//       });
//   };

//   const row = [];

//   data &&
//     data.forEach((item) => {
//       row.push({
//         id: item._id,
//         shopId: item.seller._id,
//         name: item.seller.name,
//         amount: "US$ " + item.amount,
//         status: item.status,
//         createdAt: item.createdAt.slice(0, 10),
//       });
//     });
//   return (
//     <div className="w-full flex items-center pt-5 justify-center">
//       <div className="w-[95%] bg-white">
//         <DataGrid
//           rows={row}
//           columns={columns}
//           pageSize={10}
//           disableSelectionOnClick
//           autoHeight
//         />
//       </div>
//       {open && (
//         <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
//           <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
//             <div className="flex justify-end w-full">
//               <RxCross1 size={25} onClick={() => setOpen(false)} />
//             </div>
//             <h1 className="text-[25px] text-center font-Poppins">
//               Update Withdraw status
//             </h1>
//             <br />
//             <select
//               name=""
//               id=""
//               onChange={(e) => setWithdrawStatus(e.target.value)}
//               className="w-[200px] h-[35px] border rounded"
//             >
//               <option value={withdrawStatus}>{withdrawData.status}</option>
//               <option value={withdrawStatus}>Succeed</option>
//             </select>
//             <button
//               type="submit"
//               className={`block ${styles.button} text-white !h-[42px] mt-4 text-[18px]`}
//               onClick={handleSubmit}
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminAllWithdraws;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import { axiosServerInstance } from "../../server.js";
import Loader from "../Common/Loader.jsx";

const AdminAllWithdraws = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch withdraws on mount
  useEffect(() => {
    fetchWithdraws();
  }, []);

  const fetchWithdraws = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosServerInstance.get(
        "/withdraw/get-all-withdraw-request",
        { withCredentials: true },
      );
      setWithdraws(data.withdraws || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load withdraws");
    } finally {
      setIsLoading(false);
    }
  };

  // Update withdraw status
  const handleUpdateStatus = async () => {
    if (!selectedWithdraw) return;

    setIsUpdating(true);
    try {
      const { data } = await axiosServerInstance.put(
        `/withdraw/update-withdraw-request/${selectedWithdraw.id}`,
        { sellerId: selectedWithdraw.sellerId },
        { withCredentials: true },
      );
      toast.success(data.message || "Withdraw updated successfully!");
      setWithdraws(data.withdraws || []);
      setOpenModal(false);
      setSelectedWithdraw(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update withdraw");
    } finally {
      setIsUpdating(false);
    }
  };

  // Columns
  const columns = [
    { field: "id", headerName: "Withdraw ID", minWidth: 180, flex: 0.7 },
    {
      field: "shopName",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "shopId",
      headerName: "Shop ID",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span className="font-semibold text-green-600">
          ${params.row.amount}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.6,
      cellClassName: (params) => {
        return params.row.status === "succeed"
          ? "text-green-600 font-bold"
          : "text-yellow-600 font-bold";
      },
    },
    {
      field: "createdAt",
      headerName: "Requested At",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "action",
      headerName: "Update",
      minWidth: 120,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        if (params.row.status === "succeed") {
          return <span className="text-gray-400 text-sm">Completed</span>;
        }
        return (
          <Button
            onClick={() => {
              setSelectedWithdraw(params.row);
              setOpenModal(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <BsPencil size={18} />
          </Button>
        );
      },
    },
  ];

  // Rows mapping
  const rows =
    withdraws?.map((item) => ({
      id: item._id,
      shopId: item.seller?._id || "N/A",
      shopName: item.seller?.name || "N/A",
      amount: item.amount || 0,
      status: item.status || "Processing",
      createdAt: item.createdAt?.slice(0, 10) || "N/A",
      sellerId: item.seller?._id,
    })) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[22px] font-Poppins">Withdraw Requests</h3>
          <span className="text-sm text-gray-500">
            Total: {rows.length} requests
          </span>
        </div>
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
            sx={{
              "& .text-green-600": { color: "#22c55e", fontWeight: "bold" },
              "& .text-yellow-600": { color: "#eab308", fontWeight: "bold" },
            }}
          />
        </div>
      </div>

      {/* Update Status Modal */}
      {openModal && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] 800px:w-[40%] min-h-[25vh] bg-white rounded shadow-lg p-6">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1
                size={25}
                onClick={() => {
                  setOpenModal(false);
                  setSelectedWithdraw(null);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              />
            </div>

            <h1 className="text-[22px] text-center font-Poppins font-semibold text-gray-800">
              Update Withdraw Status
            </h1>
            <p className="text-center text-gray-500 text-sm mb-4">
              Confirm to mark this withdraw request as <strong>Succeed</strong>
            </p>

            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="w-full bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Shop:</span>{" "}
                  {selectedWithdraw?.shopName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Amount:</span> $
                  {selectedWithdraw?.amount}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Current Status:</span>{" "}
                  {selectedWithdraw?.status}
                </p>
              </div>

              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                className={`${styles.button} text-white !h-[42px] px-8 text-[16px] ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Processing..." : "Confirm & Mark as Succeed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllWithdraws;
