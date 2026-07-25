import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist.js";
import { addTocart } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";
import { backend_url } from "../../server.js";

const WishlistSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(data));
    toast.success("Removed from wishlist!");
  };

  const addToCartHandler = () => {
    const existingItem = cart && cart.find((i) => i._id === data._id);
    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
      dispatch(addTocart(updatedItem));
      toast.success(`Quantity increased to ${updatedItem.qty}!`);
    } else {
      if (data.stock < 1) {
        toast.error("Out of stock!");
        return;
      }
      dispatch(addTocart({ ...data, qty: 1 }));
      toast.success("Item added to cart!");
    }
  };

  return (
    <div className="border-b border-divider p-4">
      <div className="w-full flex items-center justify-between">
        <RxCross1
          className="cursor-pointer text-ink/40 hover:text-copper transition-colors"
          onClick={removeFromWishlistHandler}
        />

        <img
          src={`${backend_url}${data?.images[0]?.url}`}
          alt={data.name}
          className="w-[80px] h-[80px] object-cover rounded-md ml-2 bg-surface"
        />

        <div className="flex-1 pl-3">
          <h1 className="text-sm font-body font-medium line-clamp-2 text-ink">
            {data.name}
          </h1>
          <span className="price-tag text-[16px] text-voltage mt-1 inline-block">
            ${data.discountPrice || data.price}
          </span>
        </div>

        <BsCartPlus
          size={22}
          className="cursor-pointer text-ink/60 hover:text-voltage transition-colors"
          onClick={addToCartHandler}
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default WishlistSingle;