import React, { useEffect } from "react";
import ProductImages from "./ProductImages";
import ProductPanel from "./productPanel/index";
import Questions from "./Questions";
import Review from "./Review";

const ProductPage = ({ product }: any) => {
  console.log("product ===>", product);
  return (
    <div className="product-grid min-h-screen pb-6">
      <ProductImages product={product} />
      <ProductPanel product={product} />
      <div className="flex flex-col md:flex-row mt-6 md:w-screen">
        <Questions />
        <Review product={product} />
      </div>
    </div>
  );
};

export default ProductPage;

const productHard = {
  title: "Test Product",
  price: 100.0,
  discountedPrice: 60.0,
  totalReviews: 10,
  productImages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  quantity: 1,
  reviews: [
    {
      name: "Emily",
      rating: 5,
      title: "Best pillow ever!",
      description:
        "I'm absolutely in love with this Luxury Memory Foam Pillow! It's incredibly comfortable and has helped me get a better night's sleep. I love how it conforms to my head and neck, and the adjustable loft is a game-changer. The bamboo cover is also a great touch - it's soft, hypoallergenic, and keeps me cool all night long. I highly recommend this pillow to anyone looking for a better sleep experience.",
    },
  ],
};
