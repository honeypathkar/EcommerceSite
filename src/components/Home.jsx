import React, { useState, useEffect } from "react";
import Item from "./Item";
import Spinner from "./assest/Spinner";
// import NoPreview from "../Images/nopreview.png";

export default function Home(props) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToFav, isFav, addToCart, isCart } = props;

  const fetchProducts = async () => {
    try {
      const url = "https://fakestoreapi.com/products";
      setLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProduct(result);
      setLoading(false);

      // console.log(result);
      // Here, you can do further processing with the products, such as updating state in a React component
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mb-20">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading && <Spinner />}
        {!loading &&
          product !== null &&
          product.map((element) => (
            <div key={element.id}>
              <Item
                title={element.title}
                imageUrl={element.image}
                description={element.description}
                rating={element.rating.rate}
                userCount={element.rating.count}
                price={element.price}
                isFav={isFav}
                addToFav={addToFav}
                addToCart={addToCart}
                isCart={isCart}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
