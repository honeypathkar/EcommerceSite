import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartSection(props) {
  const { cart, removeCartItem } = props;

  const handleRemoveCartItem = (imageUrl) => {
    removeCartItem(imageUrl);
    toast.success("Removed from Cart");
  };

  const [itemCounts, setItemCounts] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.imageUrl]: 1 }), {})
  );

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
    (acc, item) => acc + item.price * itemCounts[item.imageUrl],
    0
  );

  return (
    <>
      <div className="container">
        <h1 className="pt-3 text-2xl text-center pb-2">My Cart Item </h1>
        {cart.length === 0 ? (
          <div className=" text-center">
            <h2 className="pt-10 text-4xl">No Item Yet</h2>
          </div>
        ) : (
          <div className="mb-28">
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {cart.map((element, index) => (
                <div className="group relative" key={index}>
                  <div className="card">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <ul className="absolute top-2 right-2">
                        <Tooltip title="Remove Product" placement="right">
                          <button
                            className="navItem"
                            onClick={() =>
                              handleRemoveCartItem(element.imageUrl)
                            }
                          >
                            <DeleteIcon
                              sx={{ fontSize: "30px", color: "red" }}
                            />
                          </button>
                        </Tooltip>
                      </ul>
                      <img
                        src={element.imageUrl}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        alt="..."
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{element.title}</h5>
                      <p className="card-text">
                        {itemCounts[element.imageUrl]} X ${element.price} ={" "}
                        {element.price * itemCounts[element.imageUrl]}
                      </p>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleIncrease(element.imageUrl)}
                        disabled={itemCounts[element.imageUrl] >= 10}
                      >
                        <AddIcon />
                      </button>
                      <span className="text-xl p-2 m-2">
                        {itemCounts[element.imageUrl]}
                      </span>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleDecrease(element.imageUrl)}
                        disabled={itemCounts[element.imageUrl] < 2}
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                    <button className="btn btn-outline-dark m-2">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-pink-100 p-4 flex justify-between mt-5">
              <span className="text-xl">Total Value: {Math.floor(totalValue)}</span>
              <button className="px-4 btn btn-outline-dark">Order Now</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
