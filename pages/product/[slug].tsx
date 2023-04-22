import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CartPreview from "../../components/checkout/CartPreview";
import ProductPage from "@/components/productPage/index";

export async function getStaticPaths() {
  const url = new URL(process.env.URL || "http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  console.log(
    "res==*******=>",
    data.products.edges.map(({ node }: any) => `/product/${node.handle}`)
  );
  return {
    paths: data.products.edges.map(
      ({ node }: any) => `/product/${node.handle}`
    ),
    // In case you're building this yourself, the first deployment can't call
    // the API because it hasn't been deployed yet. This test path will get you
    // through that first deploy.
    // paths: ['/product/test'],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const url = new URL(process.env.URL || "http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();
  console.log(
    "data===>",
    data.products.edges.map(({ node }: any) => node)
  );

  const product = data.products.edges
    .map(({ node }: any) => {
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
        slug: node.handle,
        reviews: {
          ratingAverage: node.ratingAverage.value || 0,
          ratingCount: node.ratingCount.value || 0,
          productReviews: node.productReviews,
        },
      };
    })
    .find(({ slug }: any) => slug === params.slug);

  return {
    props: { product },
    // In case you're building this yourself, the first deployment can't call
    // the API because it hasn't been deployed yet. This dummy product will get
    // you through that first deploy.
    // props: {
    //   product: {
    //     id: 'a1',
    //     title: 'Test',
    //     description: 'Test',
    //     imageSrc:
    //       'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-toy.jpg',
    //     imageAlt: 'test',
    //     price: '19.99',
    //     slug: 'test',
    //   },
    // },
  };
}

export default function Product({ product }: any) {
  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <CartPreview />
      <Header />
      <ProductPage product={product} />
      <Footer />
    </div>
  );
}
