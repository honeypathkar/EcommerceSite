import React from "react";
export default function OrderSection() {
  const orders = [
    {
      id: "WU881911111",
      date: "Jul 6, 2021",
      total: "$160.00",
      items: [
        {
          name: "Micro Backpack",
          description:
            "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
          price: "$70.00",
          imageUrl: "https://placehold.co/100x100",
          deliveredDate: "Delivered on July 12, 2021",
        },
        {
          name: "Nomad Shopping Tote",
          description:
            "This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.",
          price: "$90.00",
          imageUrl: "https://placehold.co/100x100",
          deliveredDate: "Delivered on July 12, 2021",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Order history</h1>
      <p className="text-zinc-600">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>
      {orders.map((order) => (
        <div key={order.id} className="mt-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <h2 className="font-semibold">Order number</h2>
              <p>{order.id}</p>
            </div>
            <div>
              <h2 className="font-semibold">Date placed</h2>
              <p>{order.date}</p>
            </div>
            <div>
              <h2 className="font-semibold">Total amount</h2>
              <p>{order.total}</p>
            </div>
            <div>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                View Order
              </button>
              <button className="bg-zinc-300 text-black py-1 px-3 ml-2 rounded hover:bg-zinc-400">
                View Invoice
              </button>
            </div>
          </div>
          {order.items.map((item) => (
            <div key={item.name} className="flex items-start mt-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-zinc-600">{item.description}</p>
                <p className="text-green-500">{item.deliveredDate}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{item.price}</p>
                <button className="bg-blue-500 text-white py-1 px-3 mt-2 rounded hover:bg-blue-600">
                  View product
                </button>
                <button className="bg-zinc-300 text-black py-1 px-3 mt-2 rounded hover:bg-zinc-400">
                  Buy again
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
