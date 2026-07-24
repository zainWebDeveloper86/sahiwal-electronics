import { NavLink } from "react-router-dom";
import { navItems } from "../../static/data.jsx";
import styles from "../../styles/styles.js";

const Navbar = () => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex" key={index}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                `${isActive ? "text-[#17dd1f]" : "text-black 800px:text-white"} 
               pb-7.5 800px:pb-0 font-medium px-6 cursor-pointer`
              }
            >
              {item.title}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
