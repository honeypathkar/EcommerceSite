import React, { useState, useEffect } from "react";
import Spinner from "./assest/Spinner";
import Item from "./Item";

export default function CategoryItem(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      setFilteredProducts(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [props.category]);

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
          filteredProducts.map((product) => (
            <div key={product.id}>
              <Item
                title={product.title}
                imageUrl={product.image}
                description={product.description}
                price={product.price}
                rating={product.rating?.rate} // Ensure `rating` and `userCount` are provided by the API
                userCount={product.rating?.count}
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
