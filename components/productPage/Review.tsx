import React from "react";
import { configStars } from "./productPanel/index";
const Review = ({ product }: any) => {
  return (
    <div className="p-8">
      <h1 className="font-bold text-xl pb-3">Customer Reviews</h1>
      {JSON.parse(product.reviews.productReviews.value).map(
        (review: any, i: number) => (
          <CustomerReview review={review} key={i} />
        )
      )}
    </div>
  );
};

export default Review;

const CustomerReview = ({ review }: any) => {
  return (
    <div className="w-full shadow-lg bg-white h-fit flex flex-col p-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex w-fit items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-black/40"></span>
          <div className="flex flex-col">
            <h1 className="font-bold text">{review.name}</h1>
            <div className="flex flex-row items-center gap-1">
              {configStars(review.rating)}
              <h1 className="font-bold text">({review.rating})</h1>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-base">3 days ago</h1>
      </div>
      <h1 className="font-bold text-lg mt-3">{review.title}</h1>

      <h2 className="text-base">{review.description}</h2>
    </div>
  );
};
