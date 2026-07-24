import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import styles from "../../styles/styles.js";
import {
  updateUserAddress,
  deleteUserAddress,
} from "../../redux/actions/user.js";

const Address = () => {
  const dispatch = useDispatch();
  const { user, error, successMessage } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Separate states for Country, State, and City
  const [selectedCountry, setSelectedCountry] = useState("PK"); // Default Pakistan
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleEdit = (address) => {
    setEditingId(address._id);
    setSelectedCountry(address.country || "PK");
    setSelectedState(address.state || "");
    setSelectedCity(address.city || "");
    setZipCode(address.zipCode || "");
    setAddress1(address.address1 || "");
    setAddress2(address.address2 || "");
    setAddressType(address.addressType || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setSelectedState("");
    setSelectedCity("");
    setZipCode("");
    setAddress1("");
    setAddress2("");
    setAddressType("");
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      !address1 ||
      !zipCode ||
      !addressType
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    dispatch(
      updateUserAddress(
        selectedCountry,
        selectedState,
        selectedCity,
        address1,
        address2 || "",
        zipCode,
        addressType,
        editingId,
      ),
    );

    // setOpen(false);
    // // Reset form
    // setSelectedState("");
    // setSelectedCity("");
    // setZipCode("");
    // setAddress1("");
    // setAddress2("");
    // setAddressType("");
    handleClose();
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteUserAddress(item._id));
    }
  };

  return (
    <div className="w-full px-5">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md cursor-pointer`}
          onClick={() => {
            setEditingId(null);
            setOpen(true);
          }}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />

      {/* Address List */}
      {user?.addresses?.length > 0 ? (
        user?.addresses?.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-4 shadow justify-between mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="font-[600]">{item.addressType}</h5>
            </div>
            <div className="flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user?.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[8%] flex items-center justify-between">
              <AiOutlineEdit
                size={22}
                className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
                onClick={() => handleEdit(item)}
                title="Edit address"
              />
              {/* Delete Button */}
              <AiOutlineDelete
                size={22}
                className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                onClick={() => handleDelete(item)}
                title="Delete address"
              />
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-center pt-8 text-[18px] text-gray-500">
          You have no saved addresses!
        </h5>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              {editingId ? "Edit Address" : "Add New Address"}
            </h1>
            <div className="w-full">
              <form onSubmit={handleAddressSubmit} className="w-full">
                <div className="w-full block p-4">
                  {/* Country Dropdown */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCountry}
                      required
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState(""); // Reset state on country change
                        setSelectedCity(""); // Reset city on country change
                      }}
                      className="w-[95%] border h-[40px] rounded-[5px] px-2"
                    >
                      {Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Province/State Dropdown  */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Choose your Province / State{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedState}
                      required
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity(""); // Reset city on state change
                      }}
                      className="w-[95%] border h-[40px] rounded-[5px] px-2"
                    >
                      <option value="">Select Province / State</option>
                      {State.getStatesOfCountry(selectedCountry).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Dropdown (Proper mapping with State) */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Choose your City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      required
                      className="w-[95%] border h-[40px] rounded-[5px] px-2"
                      disabled={!selectedState} // 🔒 City select only when province/state already select
                    >
                      <option value="">Select City</option>
                      {selectedState &&
                        City.getCitiesOfState(
                          selectedCountry,
                          selectedState,
                        ).map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    {!selectedState && (
                      <p className="text-xs text-gray-400 mt-1">
                        Please select a province/state first to enable cities.
                      </p>
                    )}
                  </div>

                  {/* Address 1 */}
                  <div className="w-full pb-2">
                    <label htmlFor="address1" className="block pb-2">
                      Address 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      id="address1"
                      className={`${styles.input}`}
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  {/* Address 2 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2 (Optional)</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  {/* Zip Code */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      className={`${styles.input}`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  {/* Address Type */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Address Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addressType}
                      required
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] px-2"
                    >
                      <option value="">Choose your Address Type</option>
                      {addressTypeData.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition-colors`}
                      value={editingId ? "Update Address" : "Save Address"}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
