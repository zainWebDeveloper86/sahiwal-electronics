import ShopCreate from "../../components/Auth/ShopCreate.jsx";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ShopCreatePage = () => {
  // const { isSellerAuthenticated, seller } = useSelector(
  //   (state) => state.seller,
  // );
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSellerAuthenticated === true) return navigate(`/shop/${seller._id}`);
  // }, [isSellerAuthenticated,seller,navigate]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
