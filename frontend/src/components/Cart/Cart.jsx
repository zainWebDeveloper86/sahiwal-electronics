import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import CartSingle from "./CartSingle.jsx";
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
    <div
      className="fixed top-0 left-0 w-full bg-ink/40 h-screen z-20"
      onClick={() => setOpenCart(false)}
    >
      <div
        className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-ink/60 hover:text-ink"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5 className="text-2xl font-display font-medium text-ink/50">
              Cart is empty
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer text-ink/60 hover:text-ink"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} className="text-voltage" />
                <h5 className="pl-2 text-[20px] font-display font-[500] text-ink">
                  {cart && cart.length} items
                </h5>
              </div>

              <div className="w-full border-t border-divider">
                {cart && cart.map((i) => <CartSingle key={i._id} data={i} />)}
              </div>
            </div>

            <div className="px-5 mb-3" onClick={() => setOpenCart(false)}>
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-full bg-voltage rounded-md hover:opacity-90 transition-opacity">
                  <h1 className="text-white text-[18px] font-body font-[600]">
                    Checkout Now (
                    <span className="price-tag !border-0 !p-0 text-white">
                      ${totalPrice}
                    </span>
                    )
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
