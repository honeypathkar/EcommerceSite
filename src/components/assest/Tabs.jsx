import React from "react";
import { Link } from "react-router-dom";

export default function Tabs() {
  return (
    <div className="container text-center py-3">
      <ul className="nav justify-evenly gap-3">
        <li className="nav-item">
          <Link to="/category/all" className="tabItem">
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tabItem " to="/category/manclothes">
            Men's Clothes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tabItem" to="/category/womenclothes">
            Women's Clothes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tabItem" to="/category/jewelery">
            Jewelery
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tabItem" to="/category/electronics">
            Electronics
          </Link>
        </li>
      </ul>
    </div>
  );
}
