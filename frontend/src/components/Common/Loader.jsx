import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-[5px] border-divider"></div>
          <div className="absolute inset-0 rounded-full border-[5px] border-t-voltage border-r-voltage border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-[6px] rounded-full border-[3px] border-t-transparent border-r-transparent border-b-copper border-l-copper animate-spin [animation-duration:0.7s]"></div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <p className="text-xs font-body font-semibold text-ink/50 tracking-[0.2em] uppercase">
            Loading
          </p>
          <div className="h-1 w-16 overflow-hidden rounded-full bg-divider">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-voltage via-copper to-voltage bg-[length:200%_100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
