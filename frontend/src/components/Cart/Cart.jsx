import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import CartSingle from "./CartSingle";
import { useSelector } from "react-redux";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const totalPrice =
    cart &&
    cart.reduce((acc, item) => {
      const price = item.discountPrice || item.originalPrice || 0;
      return acc + price * (item.qty || 1);
    }, 0);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-20">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5 className="text-2xl font-medium text-gray-500">Cart is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </h5>
              </div>

              <div className="w-full border-t">
                {cart &&
                  cart.map((i) => <CartSingle key={i._id} data={i} />)}
              </div>
            </div>

            <div className="px-5 mb-3" onClick={() => setOpenCart(false)}>
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] hover:bg-[#c0392b] transition-colors`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;