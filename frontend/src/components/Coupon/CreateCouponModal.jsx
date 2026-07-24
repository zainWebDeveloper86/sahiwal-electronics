import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";

const CreateCouponModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");
  const [minAmount, setMinAmount] = React.useState("");
  const [maxAmount, setMaxAmount] = React.useState("");
  const [selectedProducts, setSelectedProducts] = React.useState("");
  const { products } = useSelector((state) => state.products);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      value,
      minAmount,
      maxAmount,
      selectedProducts,
    });
    // Reset form after submit
    setName("");
    setValue("");
    setMinAmount("");
    setMaxAmount("");
    setSelectedProducts("");
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-auto">
        <div className="w-full flex justify-end">
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h5 className="text-[30px] font-Poppins text-center">
          Create Coupon code
        </h5>
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your coupon code name..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Discount Percentage <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={value}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your coupon code value..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Min Amount</label>
            <input
              type="number"
              value={minAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="Enter your coupon code min amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Max Amount</label>
            <input
              type="number"
              value={maxAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Enter your coupon code max amount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Selected Product</label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={selectedProducts}
              onChange={(e) => setSelectedProducts(e.target.value)}
            >
              <option value="">Choose a selected product</option>
              {products &&
                products.map((i) => (
                  <option value={i.name} key={i._id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;