import React from "react";

export default function OrderSection({
  orders,
  orderValue,
  handleCancelOrder,
}) {
  return (
    <>
      <h1 className="pt-3 text-2xl text-center pb-3 bg-gray-100">
        My Order Section
      </h1>
      {orders.length === 0 ? (
        <div className="text-center">
          <h2 className="pt-10 text-4xl">No Item Yet</h2>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold">Order history</h1>
          <p className="text-zinc-600">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>

          {/* Scrollable div */}
          <div className="mt-4 max-h-96 overflow-y-scroll scrollbar-hide">
            <div className="items-end text-end border-b pb-2">
              <div>
                <h2 className="font-semibold text-end">Total amount</h2>
                <p>$ {Math.floor(orderValue) + 4.99}</p>
              </div>
            </div>
            {orders.map((item, index) => (
              <div key={index} className="flex items-start mt-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Order ID: {item.orderId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {item.timestamp}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">$ {item.price}</p>
                  <button
                    onClick={() => handleCancelOrder(item.orderId)}
                    className="btn-outline-danger btn"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
