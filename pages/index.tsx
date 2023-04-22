import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import CartPreview from "../components/checkout/CartPreview";
import ProductPage from "@/components/productPage/index";

const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <CartPreview />
      <Header />
      <ProductPage />
      <Footer />
    </div>
  );
};

export default Home;
