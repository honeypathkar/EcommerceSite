import React from "react";
import "../App.css";
import Tabs from "./assest/Tabs";
import { Outlet } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <Tabs />
      <Outlet/>
    </div>
  );
}
