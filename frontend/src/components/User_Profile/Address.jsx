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

  const [selectedCountry, setSelectedCountry] = useState("PK");
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
    handleClose();
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteUserAddress(item._id));
    }
  };

  const labelClass = "block pb-1 font-body font-medium text-ink";

  return (
    <div className="w-full px-2">
      <div className="flex w-full items-center justify-between border-b border-divider pb-3">
        <h1 className="text-[25px] font-display font-semibold text-ink">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md cursor-pointer !w-max px-5 !h-[42px]`}
          onClick={() => {
            setEditingId(null);
            setOpen(true);
          }}
        >
          <span className="text-white font-body font-[500]">Add New</span>
        </div>
      </div>
      <br />

      {user?.addresses?.length > 0 ? (
        user?.addresses?.map((item, index) => (
          <div
            className="w-full bg-white border border-divider rounded-lg flex flex-wrap 800px:flex-nowrap items-center px-4 py-3 justify-between mb-3 hover:border-voltage/30 transition-colors"
            key={index}
          >
            <div className="flex items-center min-w-[80px]">
              <h5 className="font-body font-semibold text-ink">
                {item.addressType}
              </h5>
            </div>
            <div className="flex items-center flex-1 min-w-0">
              <h6 className="text-[14px] font-body text-ink/70 truncate">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="flex items-center min-w-[100px] 800px:min-w-[140px]">
              <h6 className="text-[14px] font-body text-ink/50">
                {user?.phoneNumber}
              </h6>
            </div>
            <div className="flex items-center gap-3 min-w-[70px]">
              <AiOutlineEdit
                size={20}
                className="cursor-pointer text-voltage hover:text-voltage/70 transition-colors"
                onClick={() => handleEdit(item)}
                title="Edit address"
              />
              <AiOutlineDelete
                size={20}
                className="cursor-pointer text-copper hover:text-copper/70 transition-colors"
                onClick={() => handleDelete(item)}
                title="Delete address"
              />
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-center pt-8 text-[18px] font-body text-ink/50">
          You have no saved addresses!
        </h5>
      )}

      {open && (
        <div className="fixed w-full h-screen bg-ink/40 top-0 left-0 flex items-center justify-center z-50">
          <div className="w-[90%] 800px:w-[40%] h-[85vh] bg-white border border-divider rounded-lg shadow-sm relative overflow-y-scroll p-4">
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                className="cursor-pointer text-ink/50 hover:text-ink transition-colors"
                onClick={handleClose}
              />
            </div>
            <h1 className="text-center text-[24px] font-display font-semibold text-ink">
              {editingId ? "Edit Address" : "Add New Address"}
            </h1>
            <div className="w-full mt-2">
              <form onSubmit={handleAddressSubmit} className="w-full">
                <div className="w-full block space-y-3">
                  <div className="w-full">
                    <label className={labelClass}>
                      Country <span className="text-copper">*</span>
                    </label>
                    <select
                      value={selectedCountry}
                      required
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState("");
                        setSelectedCity("");
                      }}
                      className="w-full border border-divider h-[40px] rounded-md px-2 font-body focus:outline-none focus:border-voltage text-ink"
                    >
                      {Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>
                      Province / State <span className="text-copper">*</span>
                    </label>
                    <select
                      value={selectedState}
                      required
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity("");
                      }}
                      className="w-full border border-divider h-[40px] rounded-md px-2 font-body focus:outline-none focus:border-voltage text-ink"
                    >
                      <option value="">Select Province / State</option>
                      {State.getStatesOfCountry(selectedCountry).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>
                      City <span className="text-copper">*</span>
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      required
                      className="w-full border border-divider h-[40px] rounded-md px-2 font-body focus:outline-none focus:border-voltage text-ink disabled:opacity-50"
                      disabled={!selectedState}
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
                      <p className="text-xs font-body text-ink/40 mt-1">
                        Please select a province/state first.
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>
                      Address 1 <span className="text-copper">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className={`${styles.input} w-full`}
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>Address 2 (Optional)</label>
                    <input
                      type="text"
                      className={`${styles.input} w-full`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>
                      Zip Code <span className="text-copper">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      className={`${styles.input} w-full`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className={labelClass}>
                      Address Type <span className="text-copper">*</span>
                    </label>
                    <select
                      value={addressType}
                      required
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border border-divider h-[40px] rounded-md px-2 font-body focus:outline-none focus:border-voltage text-ink"
                    >
                      <option value="">Choose Address Type</option>
                      {addressTypeData.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full pt-2">
                    <button
                      type="submit"
                      className={`${styles.button} w-full !rounded-md`}
                    >
                      {editingId ? "Update Address" : "Save Address"}
                    </button>
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
