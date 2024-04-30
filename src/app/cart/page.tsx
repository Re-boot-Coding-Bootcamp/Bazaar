"use client";

import { useEffect } from "react";
import { updateCart, useAppSelector, useAppDispatch } from "~/lib";
import { Button, CartItem, OrderSummary } from "../_components";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartId = useAppSelector((state) => state.cart);
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (cartId) {
      dispatch(updateCart({ id: cartId }));
    }
  }, [cartId, dispatch]);

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-0">
      <div className="flex flex-1 flex-col md:flex-[3]">
        {cartItems.map((item) => (
          <CartItem key={item.id} product={CartItem} />
        ))}
      </div>
      <div className="flex flex-1 flex-col md:flex-[2]">
        <OrderSummary subtotal={subtotal} />
        <Button className="mt-4">Checkout</Button>
      </div>
    </div>
  );
}
