import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { useCart } from "../../Contexts/CartContext";
const Header = () => {
  const { showCartPreview, setShowCartPreview, cartTotalQuantity } = useCart();
  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };
  return (
    <>
      <div className="h-20 top-0 w-full bg-[#141414] text-white flex justify-between items-center px-8">
        <h1>Logo</h1>
        <div className="flex items-center gap-4 w-fit">
          <button className="rounded-full flex items-center justify-center p-2 border-2 border-white md:h-12 md:w-12 h-10 w-10">
            <IoMdHelp className="md:h-6 md:w-6 fill-white" />
          </button>
          <button
            onClick={toggleCart}
            className="rounded-full relative flex items-center justify-center p-2 border-2 border-white md:h-12 md:w-12 h-10 w-10"
          >
            {cartTotalQuantity > 0 && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-black bg-white rounded-full">
                {cartTotalQuantity}
              </span>
            )}
            <FaShoppingBag className="md:h-6 md:w-6 fill-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
