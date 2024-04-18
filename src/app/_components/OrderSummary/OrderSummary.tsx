import React from "react";

interface Total {
  subtotal: number;
  tax: number;
  total: number;
}

const OrderSummary = () => {

  return (
    <div
      id="order-summary-container"
      className="align-column flex flex-col justify-center font-black font-weight bold"
    >
      Order Summary
      <p className="text-md font-medium text-slate-400">Subtotal</p>
      <p className="text-md font-medium text-slate-400">Estimated Tax</p>
      <p className="text-lg font-black ">Order Total</p>
    </div>
  );
};

export { OrderSummary };
