import React, { useContext, createContext, useState } from "react";

const ProductContext = createContext<any | null>(null);

export function useProduct() {
  return useContext(ProductContext);
}

interface Props {
  children?: React.ReactNode;
}

export const ProductProvider = ({ children }: Props) => {
  const [product, setProduct] = useState({
    title: "Product Title",
    price: 100,
    image:
      "https://cdn.shopify.com/s/files/1/0018/3912/0001/products/IMG_20210223_141000_1024x1024.jpg?v=1614125000",
    quantity: 1,
  });

  const values = {
    product,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
