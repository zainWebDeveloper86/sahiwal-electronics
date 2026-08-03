import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import WishlistSingle from "./WishlistSingle.jsx";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div
      className="fixed top-0 left-0 w-full bg-ink/40 h-screen z-20"
      onClick={() => setOpenWishlist(false)}
    >
      <div
        className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-ink/60 hover:text-ink"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-2xl font-display font-medium text-ink/50">
              Wishlist is empty
            </h5>
          </div>
        ) : (
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer text-ink/60 hover:text-ink"
                onClick={() => setOpenWishlist(false)}
              />
            </div>

            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} className="text-copper" />
              <h5 className="pl-2 text-[20px] font-display font-[500] text-ink">
                {wishlist.length} items
              </h5>
            </div>

            <div className="w-full border-t border-divider">
              {wishlist.map((item, index) => (
                <WishlistSingle key={index} data={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
