import React, { useState } from "react";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Home from "./components/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./components/Category.jsx";
import CategoryItem from "./components/CategoryItem.jsx";
import MyWishlist from "./components/MyWishlist.jsx";
import Alert from "./components/assest/Alert.jsx";
import CartSection from "./components/CartSection.jsx";
import OrderSection from "./components/OrderSection.jsx";

export default function App() {
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
  };

  const removeCartItem = (imageUrl) => {
    const updateCart = cart.filter((cart) => cart.imageUrl !== imageUrl);
    setCart(updateCart);
  };

  const isCart = (imageUrl) => {
    return cart.some((cart) => cart.imageUrl === imageUrl);
  };

  const addToFav = (product) => {
    const newFav = [...fav, product];
    setFav(newFav);
  };
  const removeFromFav = (imageUrl) => {
    const updatedFav = fav.filter((fav) => fav.imageUrl !== imageUrl);
    setFav(updatedFav);
  };
  const isFav = (imageUrl) => {
    return fav.some((fav) => fav.imageUrl === imageUrl);
  };
  return (
    <div>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                addToFav={addToFav}
                isFav={isFav}
                addToCart={addToCart}
                isCart={isCart}
              />
            }
          />
          <Route exact path="category" element={<Category />}>
            <Route
              exact
              path="all"
              element={
                <Home
                  addToFav={addToFav}
                  isFav={isFav}
                  addToCart={addToCart}
                  isCart={isCart}
                />
              }
            />
            <Route
              exact
              path="manclothes"
              element={
                <CategoryItem
                  key="men's clothing"
                  category="men's clothing"
                  addToFav={addToFav}
                  isFav={isFav}
                  addToCart={addToCart}
                  isCart={isCart}
                />
              }
            />
            <Route
              exact
              path="womenclothes"
              element={
                <CategoryItem
                  key="women's clothing"
                  category="women's clothing"
                  addToFav={addToFav}
                  isFav={isFav}
                  addToCart={addToCart}
                  isCart={isCart}
                />
              }
            />
            <Route
              exact
              path="jewelery"
              element={
                <CategoryItem
                  key="jewelery"
                  category="jewelery"
                  addToFav={addToFav}
                  isFav={isFav}
                  addToCart={addToCart}
                  isCart={isCart}
                />
              }
            />
            <Route
              exact
              path="electronics"
              element={
                <CategoryItem
                  key="electronics"
                  category="electronics"
                  addToFav={addToFav}
                  isFav={isFav}
                  addToCart={addToCart}
                  isCart={isCart}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/wishlist"
            element={<MyWishlist fav={fav} removeFromFav={removeFromFav} />}
          />
          <Route exact path="/orders" element={<OrderSection />} />
          <Route
            exact
            path="/cart"
            element={
              <CartSection cart={cart} removeCartItem={removeCartItem} />
            }
          />
        </Routes>
        <BottomBar />
      </Router>
    </div>
  );
}
