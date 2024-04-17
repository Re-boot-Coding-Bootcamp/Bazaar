"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { LocalStorageKeys } from "~/constants";
import { makeStore, updateCart, type AppStore } from "~/lib";
import { api } from "~/trpc/react";
import { useIsClient } from "./IsClientContextProvider";
import { enqueueSnackbar } from "notistack";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();
  const { mutate: createCart } = api.cart.createCart.useMutation();

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    const newStore = makeStore();
    storeRef.current = newStore;
  }

  useEffect(() => {
    if (storeRef.current && isClient) {
      const existingCartId = window.localStorage.getItem(
        LocalStorageKeys.CART_ID,
      );

      enqueueSnackbar("Existing cart id: " + existingCartId);

      if (existingCartId) {
        // 1, if there is, set it to the state
        //    fetch for cart from backend
        //    once we get the cart detail, update the state
      } else {
        createCart(undefined, {
          onSuccess(newCart) {
            window.localStorage.setItem(LocalStorageKeys.CART_ID, newCart.id);
            storeRef.current?.dispatch(updateCart({ id: newCart.id }));
          },
          onError() {
            enqueueSnackbar(
              "Failed to initiatize cart session, please try again later.",
              {
                variant: "error",
              },
            );
          },
        });
      }
    }
  }, [createCart, isClient]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
