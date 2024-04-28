import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Brightness4 } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Logo from "../Images/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <header className="flex justify-between p-4 bg-pink-400">
        <Link to="/">
          <img src={Logo} alt="Brand Logo" className="h-6 w-auto" />
        </Link>
        <div className="flex">
          <Tooltip title="My Account">
            <Link to="/register">
              <AccountCircleIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Dark Mode">
            <Brightness4 className="ml-[24px]" />
          </Tooltip>
        </div>
      </header>
    </div>
  );
}
