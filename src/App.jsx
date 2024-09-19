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
import { v4 as uuidv4 } from "uuid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function App() {
  const [fav, setFav] = useState(() => {
    const savedFav = localStorage.getItem("fav");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [itemCounts, setItemCounts] = useState(() => {
    const savedItemCounts = localStorage.getItem("itemCounts");
    return savedItemCounts ? JSON.parse(savedItemCounts) : {};
  });

  const [orderValue, setOrderValue] = useState(() => {
    const savedOrderValue = localStorage.getItem("orderValue");
    return savedOrderValue ? parseFloat(savedOrderValue) : 0;
  });
  const [cartLength, setCartLength] = useState(0);

  // Effect to update cart length
  useEffect(() => {
    const newCartLength = Object.values(itemCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    setCartLength(newCartLength);
  }, [itemCounts]);

  // Effect to sync `fav`, `cart`, `orders`, and `itemCounts` with localStorage
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
    localStorage.setItem("orderValue", JSON.stringify(orderValue));
  }, [fav, cart, orders, itemCounts, orderValue]);

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [item.imageUrl]: (prevCounts[item.imageUrl] || 0) + 1,
    }));
  };

  const removeCartItem = (imageUrl) => {
    const updatedCart = cart.filter((item) => item.imageUrl !== imageUrl);
    setCart(updatedCart);
    setItemCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[imageUrl];
      return updatedCounts;
    });
  };

  const handleIncrease = (imageUrl) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [imageUrl]: prevCounts[imageUrl] + 1,
    }));
  };

  const handleDecrease = (imageUrl) => {
    if (itemCounts[imageUrl] > 1) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [imageUrl]: prevCounts[imageUrl] - 1,
      }));
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
    const newOrders = cart.map((item) => ({
      ...item,
      orderId: uuidv4(),
      timestamp: new Date().toLocaleString(),
    }));

    setOrders((prevOrders) => [...prevOrders, ...newOrders]);
    setCart([]);
    setItemCounts({});
    setOrderValue(totalOrderValue);
    setCartLength(0);
    toast.success("Order Placed");
  };

  const addToFav = (product) => {
    const newFav = [...fav, product];
    setFav(newFav);
  };

  const removeFromFav = (imageUrl) => {
    const updatedFav = fav.filter((fav) => fav.imageUrl !== imageUrl);
    setFav(updatedFav);
  };

  const isCart = (imageUrl) => {
    return cart.some((cart) => cart.imageUrl === imageUrl);
  };

  const isFav = (imageUrl) => {
    return fav.some((fav) => fav.imageUrl === imageUrl);
  };

  // Handle Cancel Order
  const handleCancelOrder = (orderId) => {
    const orderToCancel = orders.find((order) => order.orderId === orderId);

    if (orderToCancel) {
      confirmAlert({
        title: "Cancel Order",
        message: "Are you sure you want to cancel this order?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              // Update orders list by removing the canceled order
              const updatedOrders = orders.filter(
                (order) => order.orderId !== orderId
              );

              // Subtract the price of the canceled order from the order value
              const updatedOrderValue = orderValue - orderToCancel.price;

              // Update state
              setOrders(updatedOrders);
              setOrderValue(updatedOrderValue);

              // Show success message
              toast.success("Order cancelled successfully");
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
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
            element={
              <OrderSection
                orders={orders}
                orderValue={orderValue}
                handleCancelOrder={handleCancelOrder}
              />
            }
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
