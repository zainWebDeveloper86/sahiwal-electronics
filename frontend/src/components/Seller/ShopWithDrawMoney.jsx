// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
// import styles from "../../styles/styles";
// import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { loadSeller } from "../../redux/actions/user";
// import { AiOutlineDelete } from "react-icons/ai";

// const ShopWithDrawMoney = () => {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { seller } = useSelector((state) => state.seller);
//   const [paymentMethod, setPaymentMethod] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState(50);
//   const [bankInfo, setBankInfo] = useState({
//     bankName: "",
//     bankCountry: "",
//     bankSwiftCode: null,
//     bankAccountNumber: null,
//     bankHolderName: "",
//     bankAddress: "",
//   });

//   useEffect(() => {
//     dispatch(getAllOrdersOfShop(seller._id));
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const withdrawMethod = {
//       bankName: bankInfo.bankName,
//       bankCountry: bankInfo.bankCountry,
//       bankSwiftCode: bankInfo.bankSwiftCode,
//       bankAccountNumber: bankInfo.bankAccountNumber,
//       bankHolderName: bankInfo.bankHolderName,
//       bankAddress: bankInfo.bankAddress,
//     };

//     setPaymentMethod(false);

//     await axios
//       .put(
//         `${server}/shop/update-payment-methods`,
//         {
//           withdrawMethod,
//         },
//
//       )
//       .then((res) => {
//         toast.success("Withdraw method added successfully!");
//         dispatch(loadSeller());
//         setBankInfo({
//           bankName: "",
//           bankCountry: "",
//           bankSwiftCode: null,
//           bankAccountNumber: null,
//           bankHolderName: "",
//           bankAddress: "",
//         });
//       })
//       .catch((error) => {
//         console.log(error.response.data.message);
//       });
//   };

//   const deleteHandler = async () => {
//     await axios
//       .delete(`${server}/shop/delete-withdraw-method`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         toast.success("Withdraw method deleted successfully!");
//         dispatch(loadSeller());
//       });
//   };

//   const error = () => {
//     toast.error("You not have enough balance to withdraw!");
//   };

//   const withdrawHandler = async () => {
//     if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
//       toast.error("You can't withdraw this amount!");
//     } else {
//       const amount = withdrawAmount;
//       await axios
//         .post(
//           `${server}/withdraw/create-withdraw-request`,
//           { amount },
//
//         )
//         .then((res) => {
//           toast.success("Withdraw money request is successful!");
//         });
//     }
//   };

//   const availableBalance = seller?.availableBalance.toFixed(2);

//   return (
//     <div className="w-full h-[90vh] p-8">
//       <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
//         <h5 className="text-[20px] pb-4">
//           Available Balance: ${availableBalance}
//         </h5>
//         <div
//           className={`${styles.button} text-white !h-[42px] !rounded`}
//           onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
//         >
//           Withdraw
//         </div>
//       </div>
//       {open && (
//         <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
//           <div
//             className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
//               paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
//             } min-h-[40vh] p-3`}
//           >
//             <div className="w-full flex justify-end">
//               <RxCross1
//                 size={25}
//                 onClick={() => setOpen(false) || setPaymentMethod(false)}
//                 className="cursor-pointer"
//               />
//             </div>
//             {paymentMethod ? (
//               <div>
//                 <h3 className="text-[22px] font-Poppins text-center font-[600]">
//                   Add new Withdraw Method:
//                 </h3>
//                 <form onSubmit={handleSubmit}>
//                   <div>
//                     <label>
//                       Bank Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name=""
//                       required
//                       value={bankInfo.bankName}
//                       onChange={(e) =>
//                         setBankInfo({ ...bankInfo, bankName: e.target.value })
//                       }
//                       id=""
//                       placeholder="Enter your Bank name!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>
//                   <div className="pt-2">
//                     <label>
//                       Bank Country <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name=""
//                       value={bankInfo.bankCountry}
//                       onChange={(e) =>
//                         setBankInfo({
//                           ...bankInfo,
//                           bankCountry: e.target.value,
//                         })
//                       }
//                       id=""
//                       required
//                       placeholder="Enter your bank Country!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>
//                   <div className="pt-2">
//                     <label>
//                       Bank Swift Code <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name=""
//                       id=""
//                       required
//                       value={bankInfo.bankSwiftCode}
//                       onChange={(e) =>
//                         setBankInfo({
//                           ...bankInfo,
//                           bankSwiftCode: e.target.value,
//                         })
//                       }
//                       placeholder="Enter your Bank Swift Code!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>

//                   <div className="pt-2">
//                     <label>
//                       Bank Account Number{" "}
//                       <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name=""
//                       id=""
//                       value={bankInfo.bankAccountNumber}
//                       onChange={(e) =>
//                         setBankInfo({
//                           ...bankInfo,
//                           bankAccountNumber: e.target.value,
//                         })
//                       }
//                       required
//                       placeholder="Enter your bank account number!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>
//                   <div className="pt-2">
//                     <label>
//                       Bank Holder Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name=""
//                       required
//                       value={bankInfo.bankHolderName}
//                       onChange={(e) =>
//                         setBankInfo({
//                           ...bankInfo,
//                           bankHolderName: e.target.value,
//                         })
//                       }
//                       id=""
//                       placeholder="Enter your bank Holder name!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>

//                   <div className="pt-2">
//                     <label>
//                       Bank Address <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name=""
//                       required
//                       id=""
//                       value={bankInfo.bankAddress}
//                       onChange={(e) =>
//                         setBankInfo({
//                           ...bankInfo,
//                           bankAddress: e.target.value,
//                         })
//                       }
//                       placeholder="Enter your bank address!"
//                       className={`${styles.input} mt-2`}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className={`${styles.button} mb-3 text-white`}
//                   >
//                     Add
//                   </button>
//                 </form>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-[22px] font-Poppins">
//                   Available Withdraw Methods:
//                 </h3>

//                 {seller && seller?.withdrawMethod ? (
//                   <div>
//                     <div className="800px:flex w-full justify-between items-center">
//                       <div className="800px:w-[50%]">
//                         <h5>
//                           Account Number:{" "}
//                           {"*".repeat(
//                             seller?.withdrawMethod.bankAccountNumber.length - 3
//                           ) +
//                             seller?.withdrawMethod.bankAccountNumber.slice(-3)}
//                         </h5>
//                         <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
//                       </div>
//                       <div className="800px:w-[50%]">
//                         <AiOutlineDelete
//                           size={25}
//                           className="cursor-pointer"
//                           onClick={() => deleteHandler()}
//                         />
//                       </div>
//                     </div>
//                     <br />
//                     <h4>Available Balance: {availableBalance}$</h4>
//                     <br />
//                     <div className="800px:flex w-full items-center">
//                       <input
//                         type="number"
//                         placeholder="Amount..."
//                         value={withdrawAmount}
//                         onChange={(e) => setWithdrawAmount(e.target.value)}
//                         className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
//                       />
//                       <div
//                         className={`${styles.button} !h-[42px] text-white`}
//                         onClick={withdrawHandler}
//                       >
//                         Withdraw
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <p className="text-[18px] pt-2">
//                       No Withdraw Methods available!
//                     </p>
//                     <div className="w-full flex items-center">
//                       <div
//                         className={`${styles.button} text-[#fff] text-[18px] mt-4`}
//                         onClick={() => setPaymentMethod(true)}
//                       >
//                         Add new
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShopWithDrawMoney;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSeller } from "../../redux/actions/seller.js";
import styles from "../../styles/styles.js";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { axiosServerInstance } from "../../server.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader.jsx";

const ShopWithDrawMoney = () => {
  const dispatch = useDispatch();
  const { seller, loading } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });

  //  Fetch seller at page load
  useEffect(() => {
    if (!seller?._id) {
      dispatch(loadSeller());
    }
  }, [dispatch, seller?._id]);

  //  Available balance
  const availableBalance = seller?.availableBalance || 0;

  //  Add Withdraw Method Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate required fields
    if (
      !bankInfo.bankName ||
      !bankInfo.bankCountry ||
      !bankInfo.bankSwiftCode ||
      !bankInfo.bankAccountNumber ||
      !bankInfo.bankHolderName ||
      !bankInfo.bankAddress
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosServerInstance.put("/shop/update-payment-methods", {
        withdrawMethod: bankInfo,
      });
      toast.success("Withdraw method added successfully!");
      dispatch(loadSeller());
      setPaymentMethod(false);
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankAddress: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add withdraw method",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Delete Withdraw Method Handler
  const deleteHandler = async () => {
    if (
      !window.confirm("Are you sure you want to delete your withdraw method?")
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosServerInstance.delete("/shop/delete-withdraw-method", {
        withCredentials: true,
      });
      toast.success("Withdraw method deleted successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete withdraw method",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Withdraw Handler
  const withdrawHandler = async () => {
    const amount = Number(withdrawAmount);

    if (amount < 50) {
      toast.error("Minimum withdrawal amount is $50!");
      return;
    }

    if (amount > availableBalance) {
      toast.error(
        `You don't have enough balance! Available: $${availableBalance}`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosServerInstance.post("/withdraw/create-withdraw-request", {
        amount,
      });
      toast.success("Withdraw request submitted successfully!");
      setOpen(false);
      setWithdrawAmount(50);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit withdraw request",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded-lg shadow-sm flex items-center justify-center flex-col p-8">
        <h5 className="text-[24px] font-semibold pb-4 text-gray-700">
          Available Balance:{" "}
          <span className="text-[#e94560]">${availableBalance.toFixed(2)}</span>
        </h5>
        <p className="text-sm text-gray-500 mb-4">Minimum withdrawal: $50</p>
        <button
          className={`${styles.button} text-white !h-[42px] !rounded px-8 ${
            availableBalance < 50 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (availableBalance < 50) {
              toast.error("You don't have enough balance to withdraw!");
              return;
            }
            setOpen(true);
          }}
          disabled={availableBalance < 50}
        >
          Withdraw
        </button>
      </div>

      {/* ============================================= */}
      {/* Withdraw Modal */}
      {/* ============================================= */}
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow-xl rounded-lg ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-6 relative`}
          >
            {/* Close Button */}
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => {
                  setOpen(false);
                  setPaymentMethod(false);
                }}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>

            {paymentMethod ? (
              //  Add Payment Method Form
              <div>
                <h3 className="text-[22px] font-semibold text-center mb-4">
                  Add New Withdraw Method
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your bank name"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="Enter your bank country"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your bank swift code"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter your account number"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      placeholder="Enter account holder name"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Enter bank address"
                      className={`${styles.input} mt-1`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.button} text-white w-full ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Adding..." : "Add Method"}
                  </button>
                </form>
              </div>
            ) : (
              //  Withdraw Methods Display
              <div>
                <h3 className="text-[22px] font-semibold mb-4">
                  Available Withdraw Methods:
                </h3>

                {seller?.withdrawMethod ? (
                  <div>
                    {/* Method Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="800px:flex w-full justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Account Number
                          </p>
                          <p className="font-medium">
                            {"*".repeat(
                              seller.withdrawMethod.bankAccountNumber?.length -
                                4 || 0,
                            )}
                            {seller.withdrawMethod.bankAccountNumber?.slice(
                              -4,
                            ) || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Bank Name
                          </p>
                          <p className="font-medium">
                            {seller.withdrawMethod.bankName || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Holder Name
                          </p>
                          <p className="font-medium">
                            {seller.withdrawMethod.bankHolderName || "N/A"}
                          </p>
                        </div>
                        <button
                          onClick={deleteHandler}
                          disabled={isSubmitting}
                          className="cursor-pointer mt-4 800px:mt-0 text-red-500 hover:text-red-700 transition-colors"
                          title="Delete withdraw method"
                        >
                          <AiOutlineDelete size={25} />
                        </button>
                      </div>
                    </div>

                    {/* Withdraw Section */}
                    <div className="border-t pt-4">
                      <h4 className="text-[18px] font-semibold mb-2">
                        Available Balance:{" "}
                        <span className="text-[#e94560]">
                          ${availableBalance.toFixed(2)}
                        </span>
                      </h4>
                      <div className="800px:flex w-full items-center gap-3">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={withdrawAmount}
                          onChange={(e) =>
                            setWithdrawAmount(Number(e.target.value))
                          }
                          className="800px:w-[150px] w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#3957db]"
                          min="50"
                          max={availableBalance}
                        />
                        <button
                          className={`${styles.button} text-white !h-[42px] px-6 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={withdrawHandler}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Withdraw"}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Minimum withdrawal: $50
                      </p>
                    </div>
                  </div>
                ) : (
                  //  No Method Available
                  <div className="text-center py-8">
                    <p className="text-[18px] text-gray-500 mb-4">
                      No withdraw methods available!
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      Add a bank account to start withdrawing your earnings.
                    </p>
                    <button
                      className={`${styles.button} text-white`}
                      onClick={() => setPaymentMethod(true)}
                    >
                      Add Method
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopWithDrawMoney;
