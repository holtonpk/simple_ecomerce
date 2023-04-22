import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CartPreview from "../../components/checkout/CartPreview";
import ProductPage from "@/components/productPage/index";

interface Props {
  products: any;
  data: any;
}

const Product = ({ products, data }: Props) => {
  console.log("data ===>", data);
  console.log("varients ===>", products[0]);
  console.log("products===>", products);

  const selectedProduct = products[0];

  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <CartPreview />
      <Header />
      <ProductPage product={selectedProduct} />
      <Footer />
    </div>
  );
};

export default Product;

export async function getStaticProps() {
  const url = new URL("http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  console.log("data ===>", data);

  const product = data.products.edges.map(({ node }: any) => {
    if (node.totalInventory <= 0) {
      return false;
    }

    return {
      id: node.id,
      title: node.title,
      description: node.descriptionHtml,
      quantityAvailable: node.totalInventory,
      images: node.images.edges,
      imageSrc: node.images.edges[0].node.src,
      imageAlt: node.title,
      price: node.variants.edges[0].node.priceV2,
      compareAtPrice: node.variants.edges[0].node.compareAtPriceV2,
      variants: node.variants,
      reviews: {
        ratingAverage: node.ratingAverage.value || 0,
        ratingCount: node.ratingCount.value || 0,
        productReviews: node.productReviews,
      },
    };
  });

  return {
    props: {
      products: product,
      //   data: data,
    },
  };
}

interface Props {
  products: any;
}
