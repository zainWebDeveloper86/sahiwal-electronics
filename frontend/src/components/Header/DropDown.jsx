import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
  };

  return (
    <div className="absolute top-full left-0 z-30 w-[270px] mt-1 bg-white rounded-xl shadow-2xl border border-divider overflow-hidden">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-2.5 hover:bg-surface cursor-pointer transition-all duration-200 border-b border-divider last:border-none ${
              index === 0 ? "pt-3" : ""
            } ${index === categoriesData.length - 1 ? "pb-3" : ""}`}
            onClick={() => submitHandle(i)}
          >
            <div className="w-8 h-8 flex items-center justify-center bg-surface rounded-lg">
              <img
                src={i.image_Url}
                style={{ width: "20px", height: "20px", objectFit: "contain", userSelect: "none" }}
                alt={i.title}
              />
            </div>
            <h3 className="text-sm font-body font-medium text-ink hover:text-voltage transition-colors duration-200 select-none">
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;