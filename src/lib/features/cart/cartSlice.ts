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

interface UpdateCartInput {
  id?: string;
  items?: CartItem[];
}

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    updateCart: create.reducer(
      (state, action: PayloadAction<UpdateCartInput>) => {
        console.log("[RTK]", "updateCart");
        if (action.payload.id) {
          state.id = action.payload.id;
        }

        if (action.payload.items) {
          state.items = action.payload.items;
        }
      },
    ),
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

export const { updateCart, addToCart } = cartSlice.actions;
export const { selectId, selectItems } = cartSlice.selectors;
