import { Outlet } from "react-router-dom";
import SellerDashboardHeader from "../components/Seller/SellerDashboardHeader.jsx";

const SellerLayout = () => {
  return (
    <>
      <SellerDashboardHeader />
      <Outlet />
    </>
  );
};

export default SellerLayout;