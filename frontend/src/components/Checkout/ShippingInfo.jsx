import React from "react";
import styles from "../../styles/styles.js";
import { Country, State } from "country-state-city";
import { Link } from "react-router-dom";

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const safeUser = {
    name: user?.name || "Guest",
    email: user?.email || "No email provided",
    phoneNumber: user?.phoneNumber || "N/A",
    addresses: user?.addresses || [],
  };

  const hasSavedAddresses = safeUser.addresses.length > 0;

  const labelClass = "block pb-2 text-sm font-body font-medium text-ink";
  const inputClass = `${styles.input} focus:ring-2 focus:ring-voltage focus:border-voltage`;
  const selectClass =
    "w-[95%] border border-divider h-[40px] rounded-md px-3 font-body focus:outline-none focus:ring-2 focus:ring-voltage focus:border-voltage bg-white text-ink";

  return (
    <div className="w-full 800px:w-[95%] bg-white border border-divider rounded-lg p-5 pb-8">
      <h5 className="text-[18px] font-display font-semibold text-ink border-b border-divider pb-3">
        Shipping Address
      </h5>
      <br />

      <form>
        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              value={safeUser.name}
              readOnly
              className={`${styles.input} !w-[95%] bg-surface cursor-not-allowed text-ink/70`}
            />
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={safeUser.email}
              readOnly
              className={`${styles.input} bg-surface cursor-not-allowed text-ink/70`}
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              readOnly
              value={safeUser.phoneNumber}
              className={`${styles.input} !w-[95%] bg-surface cursor-not-allowed ${
                safeUser.phoneNumber === "N/A" ? "text-ink/40 italic" : "text-ink/70"
              }`}
            />
            {safeUser.phoneNumber === "N/A" && (
              <p className="text-xs text-copper mt-1 font-body">
                Please update your phone number in{" "}
                <Link to="/profile" className="text-voltage hover:underline font-medium">
                  profile
                </Link>
              </p>
            )}
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>
              Zip Code <span className="text-copper">*</span>
            </label>
            <input
              type="text"
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
              required
              placeholder="e.g. 54000"
              className={inputClass}
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>
              Country <span className="text-copper">*</span>
            </label>
            <select
              className={selectClass}
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select your country</option>
              {Country?.getAllCountries?.()?.map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>
              City <span className="text-copper">*</span>
            </label>
            <select
              className={selectClass}
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={!country}
            >
              <option value="">
                {country ? "Select your city" : "Select country first"}
              </option>
              {country &&
                State?.getStatesOfCountry?.(country)?.map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {!country && (
              <p className="text-xs font-body text-ink/40 mt-1">
                Please select a country first
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-wrap pb-3">
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>
              Address 1 <span className="text-copper">*</span>
            </label>
            <input
              type="text"
              required
              value={address1 || ""}
              onChange={(e) => setAddress1(e.target.value)}
              placeholder="Street address, P.O. Box, etc."
              className={`${inputClass} !w-[95%]`}
            />
          </div>
          <div className="w-full 800px:w-[50%]">
            <label className={labelClass}>
              Address 2 <span className="text-ink/40 text-xs font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={address2 || ""}
              onChange={(e) => setAddress2(e.target.value)}
              placeholder="Apartment, suite, unit, etc."
              className={inputClass}
            />
          </div>
        </div>
      </form>

      <div className="mt-4 pt-4 border-t border-divider">
        <h5
          className={`text-[16px] font-body font-medium cursor-pointer inline-flex items-center gap-2 transition-colors ${
            hasSavedAddresses
              ? "text-voltage hover:text-voltage/70"
              : "text-ink/30 cursor-not-allowed"
          }`}
          onClick={() => {
            if (hasSavedAddresses) {
              setUserInfo(!userInfo);
            }
          }}
        >
          {userInfo ? "▼ Hide saved addresses" : "▶ Choose from saved address"}
          {!hasSavedAddresses && (
            <span className="text-xs font-body text-ink/30 font-normal">
              (No saved addresses)
            </span>
          )}
        </h5>

        {userInfo && hasSavedAddresses && (
          <div className="mt-3 space-y-2">
            {safeUser.addresses.map((item, index) => (
              <div
                className="w-full flex items-start p-3 border border-divider rounded-lg hover:border-voltage hover:bg-surface/50 transition-colors cursor-pointer"
                key={index}
                onClick={() => {
                  setAddress1(item.address1 || "");
                  setAddress2(item.address2 || "");
                  setZipCode(item.zipCode || "");
                  setCountry(item.country || "");
                  setCity(item.city || "");
                  setUserInfo(false);
                }}
              >
                <input
                  type="radio"
                  name="savedAddress"
                  className="mt-1 mr-3 cursor-pointer flex-shrink-0 accent-voltage"
                  value={item.addressType}
                  checked={
                    address1 === item.address1 &&
                    city === item.city &&
                    country === item.country
                  }
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <span className="font-body font-semibold text-ink">
                    {item.addressType}:
                  </span>
                  <span className="font-body text-ink/60 ml-1">
                    {item.address1} {item.address2 && `, ${item.address2}`}
                    {item.city && `, ${item.city}`}
                    {item.country && `, ${item.country}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasSavedAddresses && (
          <div className="mt-2 text-sm font-body text-ink/40">
            <p>
              No saved addresses.{" "}
              <Link
                to="/profile"
                className="text-voltage hover:text-voltage/70 hover:underline font-medium"
              >
                Go to profile
              </Link>{" "}
              to add one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;