import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-cover bg-center bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80")`,
      }}
    >
      <div className="absolute inset-0 bg-ink/40" />
      <div className={`${styles.section} w-[90%] 800px:w-[60%] relative z-1`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-white font-display font-[600] capitalize">
          Best Collection for <br /> Home Electronics
        </h1>
        <p className="pt-5 text-[16px] font-body font-[400] text-white/85">
          Explore top-rated electronics from trusted sellers across the
          country — from everyday essentials <br /> to the latest gadgets,
          all in one marketplace built for reliability and speed.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-white font-body font-[500] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;