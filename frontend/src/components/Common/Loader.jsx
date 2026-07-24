import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-[5px] border-gray-200"></div>

          <div className="absolute inset-0 rounded-full border-[5px] border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent animate-spin"></div>

          <div className="absolute inset-[6px] rounded-full border-[3px] border-t-transparent border-r-transparent border-b-purple-500 border-l-purple-500 animate-spin [animation-duration:0.7s]"></div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <p className="text-xs font-semibold text-gray-500 tracking-[0.2em] uppercase">
            Loading
          </p>

          <div className="h-1 w-16 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
