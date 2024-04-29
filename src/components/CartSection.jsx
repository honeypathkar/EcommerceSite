import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

export default function CartSection(props) {
  const { cart, removeCartItem, handleDecrease, handleIncrease, itemCounts, totalValue } = props;

  const handleRemoveCartItem = (imageUrl) => {
    removeCartItem(imageUrl);
    toast.success("Removed from Cart");
  };
  return (
    <>
      <h1 className="pt-3 text-2xl text-center pb-3 bg-gray-100">
        My Cart Item{" "}
      </h1>
      {cart.length === 0 ? (
        <div className=" text-center">
          <h2 className="pt-10 text-4xl">No Item Yet</h2>
        </div>
      ) : (
        <div>
          <div className="h-screen pt-10">
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3 mb-20">
                {cart.map((element, index) => (
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start"
                    key={index}
                  >
                    <img
                      src={element.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {element.title}
                        </h2>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => handleDecrease(element.imageUrl)}
                            disabled={itemCounts[element.imageUrl] < 2}
                          >
                            <RemoveIcon />
                          </button>
                          <span className="text-xl p-2 m-2">
                            {itemCounts[element.imageUrl]}
                          </span>
                          <button
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => handleIncrease(element.imageUrl)}
                            disabled={itemCounts[element.imageUrl] >= 10}
                          >
                            <AddIcon />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">$ {element.price}</p>
                          <button
                            onClick={() =>
                              handleRemoveCartItem(element.imageUrl)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">
                    $ {parseFloat(totalValue.toFixed(2))}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">$ 4.99</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-3 text-lg font-bold">
                      $ {Math.floor(totalValue) + 4.99}USD
                    </p>
                    {/* <p className="text-sm text-gray-700">including VAT</p> */}
                  </div>
                </div>
                <Link to="/place-order">
                  <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 mb-20">
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
