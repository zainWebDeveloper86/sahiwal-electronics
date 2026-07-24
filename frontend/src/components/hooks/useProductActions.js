import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart.js";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist.js";

export const useProductActions = (productId) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === productId)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, productId]);

  const incrementCount = () => setCount((prev) => prev + 1);
  const decrementCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist!");
  };

  const removeFromWishlistHandler = (data) => {
    setClick(false);
    dispatch(removeFromWishlist(data));
    toast.success("Removed from wishlist!");
  };

  const addToCartHandler = (data) => {
    const existingItem = cart && cart.find((i) => i._id === data._id);
    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + count };
      dispatch(addTocart(updatedItem));
      toast.success(`Quantity increased to ${updatedItem.qty}!`);
    } else {
      if (data.stock < count) {
        toast.error(`Stock limited to ${data.stock} only!`);
      } else {
        dispatch(addTocart({ ...data, qty: count }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return {
    click,
    count,
    incrementCount,
    decrementCount,
    addToWishlistHandler,
    removeFromWishlistHandler,
    addToCartHandler,
  };
};