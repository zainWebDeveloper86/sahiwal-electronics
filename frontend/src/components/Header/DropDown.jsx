import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles.js";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
  };

  return (
    <div className="absolute top-full left-0 z-30 w-[270px] mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-none ${
              index === 0 ? "pt-3" : ""
            } ${index === categoriesData.length - 1 ? "pb-3" : ""}`}
            onClick={() => submitHandle(i)}
          >
            <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
              <img
                src={i.image_Url}
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "contain",
                  userSelect: "none",
                }}
                alt={i.title}
              />
            </div>
            <h3 className="text-sm font-medium text-gray-700 hover:text-[#3957db] transition-colors duration-200 select-none">
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;