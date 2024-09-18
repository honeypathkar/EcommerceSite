import React, { useState, useEffect } from "react";
import Item from "./Item";
import Spinner from "./assest/Spinner";

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      setProducts(result);
      setFilteredProducts(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <div className="container mb-20">
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {loading && <Spinner />}
        {!loading &&
          filteredProducts.map((element) => (
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
