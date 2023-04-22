import React, { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Image from "next/image";
const ProductImages = ({ product }: any) => {
  const [mobile, setMobile] = useState<any>(undefined);
  useEffect(() => {
    const updateMobile = () => {
      setMobile(window.innerWidth < 1000 ? true : false);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => {
      window.removeEventListener("resize", updateMobile);
    };
  }, []);

  return (
    <>
      {mobile ? (
        <MobileProductImage product={product} />
      ) : (
        <DesktopProductImages product={product} />
      )}
    </>
  );
};

export default ProductImages;

// Desktop ---------------------------------

const DesktopProductImages = ({ product }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-row  w-full  gap-4   h-[80vh]  ">
      <ProductImageCarouselDesktop
        productImages={product.images}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <div className=" mx-auto h-full bg-black/30 rounded-md snap-center aspect-square relative ">
        <Image
          src={product.images[selectedImageIndex].node.src}
          alt={product.images[selectedImageIndex].node.altText}
          layout="fill"
          className="rounded w-full h-full"
        />
      </div>
    </div>
  );
};

const ProductImageCarouselDesktop = ({
  productImages,
  selectedImageIndex,
  setSelectedImageIndex,
}: any) => {
  const handleClickImage = (imageIndex: any) => {
    setSelectedImageIndex(imageIndex);
  };
  const [showingProducts, setShowingProducts] = useState(
    productImages.slice(0, 5)
  );
  const [firstImage, setFirstImage] = useState(0);

  const scrollDecrease = () => {
    setFirstImage(firstImage - 5);
    setShowingProducts(productImages.slice(firstImage - 5, firstImage));
  };
  const scrollIncrease = () => {
    setFirstImage(firstImage + 5);
    setShowingProducts(productImages.slice(firstImage + 5, firstImage + 10));
  };

  return (
    <div className=" px-3 w-[15%] h-full overflow-hidden no-scrollbar relative">
      {firstImage > 0 && (
        <button
          onClick={scrollDecrease}
          className="z-10 absolute left-1/2 hover:opacity-95 -translate-x-1/2 top-0 w-[60%] h-10 p-2 bg-black text-white opacity-80 rounded-md flex items-center justify-center"
        >
          <TiArrowSortedUp className="h-5 w-5" />
        </button>
      )}
      {firstImage < productImages.length - 5 && (
        <button
          onClick={scrollIncrease}
          className="z-10 absolute left-1/2 hover:opacity-95 -translate-x-1/2 bottom-0 w-[60%] h-10 p-2 bg-black text-white opacity-80 rounded-md flex items-center justify-center"
        >
          <TiArrowSortedDown className="h-5 w-5" />
        </button>
      )}

      <div className="min-w-full p-0 relative w-full h-fit flex flex-col    gap-6 py-4">
        {showingProducts.map((image: any, i: number) => (
          <div
            key={i}
            onClick={() => handleClickImage(i)}
            className={`
        ${
          productImages[selectedImageIndex] === image
            ? "border-black"
            : "border-transparent"
        }
         w-full  bg-black/30 border-2 relative aspect-square rounded-md cursor-pointer hover:border-black`}
          >
            <Image
              src={image.node.src}
              alt={image.node.altText}
              layout="fill"
              className="rounded w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile ---------------------------------

const MobileProductImage = ({ product }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <div className="flex  flex-col w-full  gap-4 overflow-show h-fit ">
      <MainProductImageMobile
        selectedImageIndex={selectedImageIndex}
        productImages={product.images}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <ProductImageCarouselMobile
        selectedImage={selectedImageIndex}
        setSelectedImage={setSelectedImageIndex}
        productImages={product.images}
      />
    </div>
  );
};

const MainProductImageMobile = ({ productImages, selectedImageIndex }: any) => {
  useEffect(() => {
    const imageBox = document.getElementById("imageBox");
    imageBox?.scrollTo(window.innerWidth * selectedImageIndex, 0);
  }, [selectedImageIndex]);

  return (
    <div
      id="imageBox"
      className=" no-scrollbar bg-black/30 snap-x snap-mandatory  scroll-smooth grid grid-flow-col overflow-scroll w-full  aspect-square relative"
    >
      {productImages.map((image: any, i: number) => (
        <div
          key={i}
          className="  bg-black/30  w-screen  snap-center aspect-square relative "
        >
          <Image
            src={image.node.src}
            alt={image.node.altText}
            layout="fill"
            className="rounded w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

const ProductImageCarouselMobile = ({
  selectedImage,
  setSelectedImage,
  productImages,
}: any) => {
  const handleClickImage = (imageIndex: any) => {
    setSelectedImage(imageIndex);
  };
  return (
    <div className=" w-full h-20  overflow-scroll no-scrollbar">
      <div className="min-w-full px-2 w-fit relative  flex   h-full gap-4">
        {productImages.map((image: any, i: number) => (
          <div
            key={i}
            onClick={() => handleClickImage(i)}
            className={`
            ${selectedImage === image ? "border-black" : "border-transparent"}
              bg-black/30 border-2 relative aspect-square rounded-md cursor-pointer hover:border-black`}
          >
            <Image
              src={image.node.src}
              alt={image.node.altText}
              layout="fill"
              className="rounded w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
