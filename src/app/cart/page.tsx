"use client";

import { useAppSelector, selectItems } from "~/lib";
import { BreadCrumb, CartItem, OrderSummary } from "../_components";

export default function CartPage() {
  const cartItems = useAppSelector(selectItems);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceForCartItem = item.quantity * item.productVariant.price;
    return acc + priceForCartItem;
  }, 0);

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8">
      <BreadCrumb
        items={[
          { text: "Home", href: "/" },
          {
            text: "Cart",
          },
        ]}
      />
      <div className="flex items-center gap-1">
        <p className="text-2xl font-light">Cart</p>
        <p className="pt-1 text-gray-500">
          ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
        </p>
      </div>
      <div
        id="cart-details-container"
        className="flex flex-col justify-between gap-4 md:flex-row"
      >
        {cartItems.length > 0 ? (
          <>
            <div id="cart-items-container" className="flex-[2]">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} cartItemData={item} />
                ))}
              </div>
            </div>
            <div id="order-summary-container" className="flex-1">
              <OrderSummary subtotal={subtotal} />
            </div>
          </>
        ) : (
          <p>There are no items in your cart 👀</p>
        )}
      </div>
    </div>
  );
}
