import React, { useContext, createContext, useState } from "react";

const CartContext = createContext<any | null>(null);

export function useCart() {
  return useContext(CartContext);
}

interface Props {
  children?: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cart, setCart] = useState<any>([]);

  const addToCart = (product: any) => {
    const productIndex = cart.findIndex((item) => item.title === product.title);
    const newCart = [...cart];
    if (newCart[productIndex]) {
      newCart[productIndex].quantity = newCart[productIndex].quantity + 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
  };

  const updateQuantity = (e: any, productTitle: any) => {
    const productIndex = cart.findIndex(
      (product) => product.title === productTitle
    );
    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity = parseInt(e.target.value);
      setCart(newCart);
    }
  };

  const removeItem = (productTitle: any) => {
    const newCart = cart.filter((product: any) => {
      return product.title !== productTitle;
    });
    setCart(newCart);
  };

  const checkoutObject = [
    ...cart.map((product: any) => {
      return {
        variantId: product.variantId,
        quantity: product.quantity,
      };
    }),
  ];

  console.log(checkoutObject);

  const cartTotalPrice =
    cart.length > 0 &&
    cart
      .reduce((total: any, product: any) => {
        return total + parseInt(product.price.amount) * product.quantity;
      }, 0)
      .toFixed(2);

  const cartTotalQuantity = cart.reduce(
    (total: any, product: any) => total + product.quantity,
    0
  );

  const values = {
    showCartPreview,
    setShowCartPreview,
    checkoutObject,
    cart,
    setCart,
    addToCart,
    updateQuantity,
    removeItem,
    cartTotalPrice,
    cartTotalQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartContext;
