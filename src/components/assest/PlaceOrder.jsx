import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

export default function PlaceOrder({ totalValue, handleClickOrder }) {
  const [payment, setPayment] = useState("");

  const handleChange = (event) => {
    setPayment(event.target.value);
  };
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-6">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Order Summary
              </h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-gray-100 h-[1px] w-full"
                ></div>
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div className="font-medium">
                    ${parseFloat(totalValue).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Shipping</div>
                  <div className="font-medium">$4.99</div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-gray-100 h-[1px] w-full"
                ></div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Total</div>
                  <div className="font-medium">
                    ${Math.floor(totalValue) + 4.99}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Checkout
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="name"
                  >
                    Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="name"
                    placeholder="John Doe"
                    required=""
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="john@example.com"
                    required=""
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="address"
                >
                  Shipping Address
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="address"
                  placeholder="123 Main St, Anytown USA"
                  required=""
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Payment
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={payment}
                      label="Payment"
                      onChange={handleChange}
                    >
                      <MenuItem value="Gp">Google Pay</MenuItem>
                      <MenuItem value="cc">Credit Card</MenuItem>
                      <MenuItem value="pp">Phone Pay</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="flex items-center p-6">
                <Link to="/orders"> 
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    type="submit"
                    onClick={handleClickOrder}
                  >
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
