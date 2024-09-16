import React from "react";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "react-toastify/dist/ReactToastify.css";
import StarIcon from "@mui/icons-material/Star";

export default function Item(props) {
  const {
    title,
    imageUrl,
    price,
    addToFav,
    isFav,
    addToCart,
    isCart,
    rating,
    userCount,
  } = props;

  const handleFavClick = () => {
    addToFav({
      title,
      imageUrl,
      price,
    });
    toast.success("Added To Wishlist");
  };

  const handleCartClick = () => {
    addToCart({
      title,
      imageUrl,
      price,
    });
    toast.success("Added to Cart");
  };

  return (
    <div className="group relative">
      <div className="card">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <ul className="absolute top-2 right-2">
            <Tooltip
              title={`${
                isFav(imageUrl) ? "Added to Wishlist" : "Add to Wishlist"
              }`}
              placement="right"
            >
              <button
                className="navItem"
                onClick={handleFavClick}
                disabled={isFav(imageUrl)}
              >
                {isFav(imageUrl) ? (
                  <FavoriteIcon sx={{ fontSize: "30px", color: "#ff4162" }} />
                ) : (
                  <FavoriteBorderOutlined
                    sx={{ fontSize: "30px", color: "#ff4162" }}
                  />
                )}
              </button>
            </Tooltip>
          </ul>
          <img
            src={imageUrl}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="flex items-center">
            <div
              className={`flex items-center text-sm ${
                rating >= 4 ? "bg-green-600" : "bg-yellow-500"
              } px-1 rounded-sm mb-1`}
              style={{ maxWidth: "max-content" }}
            >
              <span className="mr-1 text-white">{rating}</span>
              <StarIcon sx={{ fontSize: "14px", color: "white" }} />
            </div>
            <p className="pl-2">({userCount})</p>
          </div>
          <p className="card-text">$ {price}</p>
        </div>
        <button
          className="btn btn-outline-dark m-2"
          onClick={handleCartClick}
          disabled={isCart(imageUrl)}
        >
          {isCart(imageUrl) ? "Added To Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}
