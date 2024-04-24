import React from "react";

interface Props {
  subtotal: number;
}

const OrderSummary = ({ subtotal }: Props): JSX.Element => {
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  const displayPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div id="order-summary-container" className="border border-gray-500 p-3">
      <p id="title" className="text-lg font-bold">
        Order Summary
      </p>

      <table className="w-full">
        <tbody>
          <tr className="text-gray-500">
            <td>Subtotal</td>
            <td className="text-right">{displayPrice(subtotal)}</td>
          </tr>
          <tr className="text-gray-500">
            <td>Estimated Tax</td>
            <td className="text-right">{displayPrice(tax)}</td>
          </tr>
          <tr>
            <td className="font-black">Order Total</td>
            <td className="text-right font-black">{displayPrice(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { OrderSummary };
