import React from "react";
import styles from "../../styles/styles.js";

const brands = [
  {
    name: "Sony",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
  },
  {
    name: "Dell",
    url: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
  },
  {
    name: "HP",
    url: "https://logos-world.net/wp-content/uploads/2020/11/HP-Logo.png",
  },
  {
    name: "Apple",
    url: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo-1998-present.png",
  },
];

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white border border-divider py-10 px-5 mb-12 rounded-lg`}
    >
      <p className="text-center font-body text-xs tracking-wide uppercase text-ink/40 mb-6">
        Trusted brands on our marketplace
      </p>
      <div className="flex justify-between items-center w-full flex-wrap gap-6">
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.url}
            alt={brand.name}
            style={{ width: "150px", objectFit: "contain" }}
            className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
