import { createAppSlice } from "~/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@prisma/client";

export interface CartSliceState {
  id: string | undefined;
  items: CartItem[];
}

const initialState: CartSliceState = {
  id: undefined,
  items: [],
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    initializeCart: create.reducer((state) => {
      console.log("[RTK]", "initializeCart");
      // check in the local storage if there is a cart id
      // 1, if there is, set it to the state
      //    fetch for cart from backend
      //    once we get the cart detail, update the state
      // 2, if there is no cart id, create a new cart
      //    save the cart id to the local storage
    }),
    addToCart: create.reducer((state, action: PayloadAction) => {
      console.log("[RTK]", "addToCart");
      // add productVariant to the cart
      // 1, make a backend call to add the productVariant to the cart
      // 2, once we get the response, update the state
    }),
  }),
  selectors: {
    selectId: (cart) => cart.id,
    selectItems: (cart) => cart.items,
  },
});

export const { initializeCart, addToCart } = cartSlice.actions;
export const { selectId, selectItems } = cartSlice.selectors;
