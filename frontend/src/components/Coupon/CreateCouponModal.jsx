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
    setName("");
    setValue("");
    setMinAmount("");
    setMaxAmount("");
    setSelectedProducts("");
  };

  if (!open) return null;

  const inputClass =
    "mt-2 appearance-none block w-full px-3 h-[38px] border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm";
  const labelClass = "pb-1 font-body font-medium text-ink";

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-ink/40 z-[20000] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white border border-divider rounded-lg p-6 overflow-y-auto">
        <div className="w-full flex justify-end">
          <RxCross1
            size={25}
            className="cursor-pointer text-ink/50 hover:text-ink transition-colors"
            onClick={onClose}
          />
        </div>
        <h5 className="text-[26px] font-display font-[600] text-ink text-center">
          Create Coupon Code
        </h5>
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className={labelClass}>
              Name <span className="text-copper">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your coupon code name..."
            />
          </div>
          <br />
          <div>
            <label className={labelClass}>
              Discount Percentage <span className="text-copper">*</span>
            </label>
            <input
              type="text"
              required
              value={value}
              className={inputClass}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your coupon code value..."
            />
          </div>
          <br />
          <div>
            <label className={labelClass}>Min Amount</label>
            <input
              type="number"
              value={minAmount}
              className={inputClass}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="Enter your coupon code min amount..."
            />
          </div>
          <br />
          <div>
            <label className={labelClass}>Max Amount</label>
            <input
              type="number"
              value={maxAmount}
              className={inputClass}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Enter your coupon code max amount..."
            />
          </div>
          <br />
          <div>
            <label className={labelClass}>Selected Product</label>
            <select
              className="w-full mt-2 border border-divider h-[38px] rounded-md font-body focus:outline-none focus:border-voltage text-ink"
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
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[40px] rounded-md bg-voltage text-white font-body font-[600] hover:opacity-90 transition-opacity sm:text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;