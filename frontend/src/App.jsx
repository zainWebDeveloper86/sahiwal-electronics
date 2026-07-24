import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes/router.jsx";
import { loadUser } from "./redux/actions/user.js";
import { loadSeller } from "./redux/actions/seller.js";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Common/Loader.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { loading: userLoading } = useSelector((state) => state.user);
  const { loading: sellerLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <>
      {userLoading || sellerLoading ? (
        <Loader />
      ) : (
        <RouterProvider router={router} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
