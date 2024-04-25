import React from "react";
import { HomeOutlined } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { CategoryOutlined } from "@mui/icons-material";
import "../App.css"
import { Link } from "react-router-dom";

export default function BottomBar() {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-[#d0d1d24d] bg-pink-400 -mb-5">
        <ul className="flex justify-around h-ful max-w-[100rem] mx-auto my-3 text-2xl color-white">
          <li>
            <Link className="navItem" to="/">
              <HomeOutlined sx={{ fontSize: "30px" }} />
            </Link>
            <span>Home</span>
          </li>
          <li>
            <Link className="navItem" to="/category/all">
              <CategoryOutlined sx={{ fontSize: "30px" }} />
            </Link>
            <span>Category</span>
          </li>
          <li>
            <Link className="navItem" to="/orders">
              <ShoppingBagOutlined sx={{ fontSize: "30px" }} />
            </Link>
            <span>My Orders</span>
          </li>
          <li>
            <Link className="navItem" to="/wishlist">
              <FavoriteBorderOutlined sx={{ fontSize: "30px" }} />
            </Link>
            <span>My Wishlist</span>
          </li>
          <li>
            <Link className="navItem" to="/cart">
              <ShoppingCartOutlinedIcon sx={{ fontSize: "30px" }} />
            </Link>
            <span>Cart</span>
          </li>
        </ul>
      </footer>
    </div>
  );
}
