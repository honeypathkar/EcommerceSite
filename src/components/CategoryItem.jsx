import React, { useState, useEffect } from "react";
import Spinner from "./assest/Spinner";
import Item from "./Item";
import NoPreview from "../Images/nopreview.png";

export default function CategoryItem(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToFav, isFav, addToCart, isCart } = props;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${props.category}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mb-20">
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading && <Spinner />}
        {!loading &&
          products.map((product) => (
            <div key={product.id}>
              <Item
                title={product.title}
                imageUrl={product.image}
                description={product.description}
                price={product.price}
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
