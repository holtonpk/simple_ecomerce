import React, { useState } from "react";
import Tabs from "./Tabs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "@/Contexts/CartContext";
import { TbStarFilled, TbStar, TbStarHalfFilled } from "react-icons/tb";
const ProductPanel = ({ product }: any) => {
  const { addToCart, setShowCartPreview } = useCart();
  const [selectedProduct, setSelectedProduct] = useState({
    title: product.title,
    price: product.price,
    variantId: product.variants.edges[0].node.id,
    quantity: 1,
    images: product.images,
    quantityAvailable: product.quantityAvailable,
  });

  const addItemToCart = () => {
    addToCart(selectedProduct);
    setShowCartPreview(true);
  };

  return (
    <div className=" md:h-fit p-4 flex flex-col ">
      <h1 className="text-3xl font-bold text-indigo-600 b-r ">
        {product.title}
      </h1>
      <Price product={product} />
      <Reviews product={product} />
      <div className="flex flex-col gap-4 mt-4">
        <button
          onClick={addItemToCart}
          className="bg-black w-full rounded-md p-3 flex items-center justify-center text-white font-bold text-lg"
        >
          Add To Bag
        </button>
        <button className="bg-black w-full rounded-md p-3 flex items-center justify-center text-white font-bold text-lg bg-opacity-70">
          Buy Now
        </button>
      </div>
      <Tabs product={product} />
    </div>
  );
};

export const Quantity = () => {
  const availableQuantity = 10;
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <h1 className="text-md mt-4">Quantity:</h1>
      <div className=" w-fit flex justify-between  border-black border-[1px]  rounded-md items-center">
        <button
          onClick={decreaseQuantity}
          className={`
          ${quantity === 1 ? "" : ""}
rounded-md h-10 w-10 p-1 flex items-center justify-center text-white font-bold text-lg `}
        >
          <FaMinus className="h-3 w-3 fill-black/70 " />
        </button>
        <input
          className="bg-transparent border-l-[1px] border-r-[1px] border-black text-center w-12 p-3 flex items-center justify-center text-black/70 font-bold text-lg"
          type="number"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          value={quantity}
        />
        <button
          onClick={increaseQuantity}
          className={`
          ${quantity === availableQuantity ? "" : ""}
h-10 w-10 s p-1 flex items-center justify-center text-white font-bold text-lg `}
        >
          <FaPlus className="h-3 w-3 fill-black/70" />
        </button>
      </div>
    </>
  );
};

export default ProductPanel;

const Price = ({ product }: any) => {
  return (
    <div className="flex flex-row gap-4 mt-2">
      <h1 className="text-2xl line-through">
        {/* {"$" + formatPrice(product.compareAtPrice.amount)} */}
      </h1>
      <h1 className="text-2xl ">{"$" + formatPrice(product.price.amount)}</h1>
    </div>
  );
};

const Reviews = ({ product }: any) => {
  return (
    <div className="flex flex-row items-center gap-2 mt-3">
      {configStars(JSON.parse(product.reviews.ratingAverage).value)}
      <div className="underline flex items-center cursor-pointer decoration-black/30 hover:decoration-black">
        Reviews
        <h2 className=" text-gray-400">({product.reviews.ratingCount})</h2>
      </div>
    </div>
  );
};

export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const configStars = (ratingAverage: any) => {
  const ratingTotal = Math.round(ratingAverage * 2) / 2;
  const filledStars = Math.floor(ratingTotal);
  const hasHalfStar = ratingTotal - filledStars !== 0;
  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <TbStarFilled className="h-6 w-6 text-black" key={`filled-${i}`} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <TbStarHalfFilled className="h-6 w-6 text-black" key="half-filled" />
    );
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(<TbStar className="h-6 w-6 text-black" key={`empty-${i}`} />);
  }
  return <>{stars}</>;
};
