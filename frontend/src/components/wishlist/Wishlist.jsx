import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import WishlistSingle from "./WishlistSingle";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-20">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-2xl font-medium text-gray-500">
              Wishlist is empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>

              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist.length} items
                </h5>
              </div>

              <div className="w-full border-t">
                {wishlist.map((item, index) => (
                  <WishlistSingle key={index} data={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
