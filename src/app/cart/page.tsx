"use client";

import {
  useAppSelector,
  selectItems,
  selectId,
  useAppDispatch,
  clearCart,
} from "~/lib";
import { BreadCrumb, Button, CartItem, OrderSummary } from "../_components";
import { api } from "~/trpc/react";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { mutateAsync: checkout } = api.cart.checkout.useMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartId = useAppSelector(selectId);
  const cartItems = useAppSelector(selectItems);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceForCartItem = item.quantity * item.productVariant.price;
    return acc + priceForCartItem;
  }, 0);

  const handleCheckout = async () => {
    if (cartId) {
      setIsCheckingOut(true);
      try {
        await checkout({ cartId });
        dispatch(clearCart());
        setIsCheckingOut(false);
        enqueueSnackbar("Checkout successful", { variant: "success" });
        setTimeout(() => {
          router.push("/");
        }, 500);
      } catch {
        setIsCheckingOut(false);
        enqueueSnackbar(
          "Unexpected error while checking out, please try again later.",
          { variant: "error" },
        );
      }
    }
  };

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
              <Button
                className="mt-2 w-full"
                variant="standard"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
            </div>
          </>
        ) : (
          <p>There are no items in your cart 👀</p>
        )}
      </div>
    </div>
  );
}
