import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";


export default function CartSection(props) {
  const { cart, removeCartItem } = props;
  const handleRemoveCartItem = (imageUrl) => {
    removeCartItem(imageUrl);
    toast.success("Removed from Cart");
  };
  return (
    <div className="container">
      <h1 className="pt-3 text-2xl text-center">My Cart Item </h1>
      {cart.length === 0 ? (
        <div className=" text-center">
          <h2 className="pt-10 text-4xl">No Item Yet</h2>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cart.map((element, index) => (
            <div className="group relative" key={index}>
              <div className="card">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <ul className="absolute top-2 right-2">
                    <button
                      className="navItem"
                      onClick={() => handleRemoveCartItem(element.imageUrl)}
                    >
                      <DeleteIcon sx={{ fontSize: "30px", color: "red" }} />
                    </button>
                  </ul>
                  <img
                    src={element.imageUrl}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">$ {element.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
