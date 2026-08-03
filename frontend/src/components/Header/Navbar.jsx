import { NavLink } from "react-router-dom";
import { navItems } from "../../static/data.jsx";
import styles from "../../styles/styles.js";

const Navbar = ({ closeSidebar }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex" key={index}>
            <NavLink
              to={item.url}
              onClick={() => {
                if (closeSidebar) {
                  closeSidebar();
                }
              }}
              className={({ isActive }) =>
                `${isActive ? "text-copper" : "text-ink 800px:text-white/85"}
               pb-7.5 800px:pb-0 font-body font-medium px-6 cursor-pointer hover:text-copper transition-colors`
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
