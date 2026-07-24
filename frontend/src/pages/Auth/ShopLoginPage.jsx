import ShopLogin from "../../components/Auth/ShopLogin";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
  // const { isSellerAuthenticated,seller } = useSelector((state) => state.seller);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSellerAuthenticated === true) return navigate(`/shop/${seller._id}`);
  // }, [isSellerAuthenticated,seller,navigate]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
