import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const WishlistSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  // Remove from wishlist
  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(data));
    toast.success("Removed from wishlist!");
  };

  // Add to cart (with quantity 1)
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
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart!");
    }
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        {/* Remove Icon */}
        <RxCross1
          className="cursor-pointer text-gray-500  hover:text-red-500"
          onClick={removeFromWishlistHandler}
        />

        {/* Product Image */}
        <img
          src={`${backend_url}${data?.images[0]?.url}`}
          alt={data.name}
          className="w-[80px] h-[80px] object-cover rounded-md ml-2"
        />

        {/* Product Details */}
        <div className="flex-1 pl-3">
          <h1 className="text-sm font-medium line-clamp-2">{data.name}</h1>
          <h4 className="font-[600] text-[17px] text-[#d02222]">
            US${data.discountPrice || data.price}
          </h4>
        </div>

        {/* Add to Cart Icon */}
        <BsCartPlus
          size={22}
          className="cursor-pointer text-gray-700 hover:text-[#3957db] transition-colors"
          onClick={addToCartHandler}
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default WishlistSingle;