import { createAppSlice } from "~/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ExtendedCartItem } from "~/types";

export interface CartSliceState {
  id: string | undefined;
  items: ExtendedCartItem[];
}

const initialState: CartSliceState = {
  id: undefined,
  items: [],
};

interface UpdateCartInput {
  id?: string;
  items?: ExtendedCartItem[];
}

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    updateCart: create.reducer(
      (state, action: PayloadAction<UpdateCartInput>) => {
        if (action.payload.id) {
          state.id = action.payload.id;
        }

        if (action.payload.items) {
          state.items = action.payload.items;
        }
      },
    ),
    clearCart: create.reducer((state) => {
      state.items = [];
    }),
  }),
  selectors: {
    selectId: (cart) => cart.id,
    selectItems: (cart) => cart.items,
  },
});

export const { updateCart, clearCart } = cartSlice.actions;
export const { selectId, selectItems } = cartSlice.selectors;
