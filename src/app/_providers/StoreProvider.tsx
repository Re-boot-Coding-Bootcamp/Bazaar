"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { LocalStorageKeys } from "~/constants";
import { addToFavorite, makeStore, updateCart, type AppStore } from "~/lib";
import { api } from "~/trpc/react";
import { useIsClient } from "./IsClientContextProvider";
import { enqueueSnackbar } from "notistack";
import type { FavoritedItem } from "~/types";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();
  const [cartId, setCartId] = useState<string>();

  const { mutate: createCart } = api.cart.createCart.useMutation();
  const { data: cartData } = api.cart.getCart.useQuery(
    { cartId: cartId ?? "" },
    {
      enabled: !!cartId,
    },
  );

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    const newStore = makeStore();
    storeRef.current = newStore;
  }

  useEffect(() => {
    if (cartData && cartData.items.length > 0) {
      storeRef.current?.dispatch(updateCart({ items: cartData.items }));
    }
  }, [cartData]);

  useEffect(() => {
    if (storeRef.current && isClient) {
      const existingCartId = window.localStorage.getItem(
        LocalStorageKeys.CART_ID,
      );

      const favoritedItems = window.localStorage.getItem(
        LocalStorageKeys.FAVORITED_PRODUCTS,
      );

      if (existingCartId) {
        storeRef.current?.dispatch(updateCart({ id: existingCartId }));
        setCartId(existingCartId);
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

      if (favoritedItems) {
        const favItemsObject = JSON.parse(favoritedItems) as FavoritedItem[];
        favItemsObject.forEach((item) => {
          storeRef.current?.dispatch(addToFavorite({ item }));
        });
      }
    }
  }, [createCart, isClient]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
