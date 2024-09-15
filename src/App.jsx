import React, { useState, useEffect } from "react";
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
import PlaceOrder from "./components/assest/PlaceOrder.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [orderValue, setOrderValue] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    // Calculate and update cart length based on item counts
    const newCartLength = Object.values(itemCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    setCartLength(newCartLength);
  }, [itemCounts]);

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.imageUrl]: (prevCounts[item.imageUrl] || 0) + 1,
    }));
    // setCartLength(newCart.length);
  };
  console.log(cartLength);

  const removeCartItem = (imageUrl) => {
    const updatedCart = cart.filter((item) => item.imageUrl !== imageUrl);
    setCart(updatedCart);
    setItemCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[imageUrl];
      return updatedCounts;
    });
    // setCartLength(updatedCart.length);
  };

  const handleIncrease = (imageUrl) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [imageUrl]: prevCounts[imageUrl] + 1,
    }));
    // setCartLength(cart.length);
  };

  const handleDecrease = (imageUrl) => {
    if (itemCounts[imageUrl] > 1) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [imageUrl]: prevCounts[imageUrl] - 1,
      }));
      // setCartLength(cartLength + itemCounts);
    }
  };

  const totalValue = cart.reduce(
    (acc, item) => acc + item.price * (itemCounts[item.imageUrl] || 1),
    0
  );

  const handleClickOrder = () => {
    const totalOrderValue = cart.reduce(
      (acc, item) => acc + item.price * (itemCounts[item.imageUrl] || 1),
      0
    );

    setOrders((prevOrders) => [...prevOrders, ...cart]); // Append new cart items to the previous orders
    setCart([]); // Clear the cart
    setItemCounts({}); // Reset itemCounts to an empty object
    setOrderValue(totalOrderValue); // Update totalValue in App component
    setCartLength(0); // Reset cart length
    toast.success("Order Placed");
  };

  // console.log(order);

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
            element={
              <MyWishlist
                fav={fav}
                removeFromFav={removeFromFav}
                addToCart={addToCart}
                isCart={isCart}
              />
            }
          />
          <Route
            exact
            path="/orders"
            element={<OrderSection orders={orders} orderValue={orderValue} />}
          />
          <Route
            exact
            path="/cart"
            element={
              <CartSection
                cart={cart}
                removeCartItem={removeCartItem}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                itemCounts={itemCounts}
                totalValue={totalValue}
              />
            }
          />
          <Route
            exact
            path="/place-order"
            element={
              <PlaceOrder
                totalValue={totalValue}
                handleClickOrder={handleClickOrder}
              />
            }
          />
        </Routes>
        <BottomBar cartLength={cartLength} />
      </Router>
    </div>
  );
}
