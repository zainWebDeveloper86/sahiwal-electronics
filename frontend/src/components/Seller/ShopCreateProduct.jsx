import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product.js";
import { categoriesData } from "../../static/data.jsx";
import { toast } from "react-toastify";

const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearProductErrors" });
    }
    if (success) {
      toast.success("Product created successfully!");
      dispatch({ type: "ClearProductSuccess" });
      navigate("/dashboard");
    }
  }, [dispatch, error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImage) => [...prevImage, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => newForm.append("images", image));
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
  };

  const inputClass =
    "mt-2 appearance-none block w-full px-3 h-[38px] border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm";
  const labelClass = "pb-2 font-body font-medium text-ink";

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white border border-divider h-[80vh] rounded-lg p-5 overflow-y-scroll">
      <h5 className="text-[26px] font-display font-[600] text-ink text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className={labelClass}>
            Name <span className="text-copper">*</span>
          </label>
          <input
            type="text"
            value={name}
            className={inputClass}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className={labelClass}>
            Description <span className="text-copper">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            value={description}
            className={inputClass.replace("h-[38px]", "pt-2")}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className={labelClass}>
            Category <span className="text-copper">*</span>
          </label>
          <select
            className="w-full mt-2 border border-divider h-[38px] rounded-md font-body focus:outline-none focus:border-voltage"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className={labelClass}>Tags</label>
          <input
            type="text"
            value={tags}
            className={inputClass}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className={labelClass}>Original Price</label>
          <input
            type="number"
            value={originalPrice}
            className={inputClass}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className={labelClass}>
            Price (With Discount) <span className="text-copper">*</span>
          </label>
          <input
            type="number"
            value={discountPrice}
            className={inputClass}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className={labelClass}>
            Product Stock <span className="text-copper">*</span>
          </label>
          <input
            type="number"
            value={stock}
            className={inputClass}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className={labelClass}>
            Upload Images <span className="text-copper">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3 text-ink/40 hover:text-voltage transition-colors cursor-pointer" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2 rounded-md border border-divider"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[40px] rounded-md bg-voltage text-white font-body font-[600] hover:opacity-90 transition-opacity sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopCreateProduct;
