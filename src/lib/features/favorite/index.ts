import { createAppSlice } from "~/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { FavoritedItem } from "~/types";
import { LocalStorageKeys } from "~/constants";

export interface FavoriteSliceState {
  items: FavoritedItem[];
  count: number;
}

const initialState: FavoriteSliceState = {
  items: [],
  count: 0,
};

interface FavoritedInput {
  item: FavoritedItem;
}

export const favoriteSlice = createAppSlice({
  name: "favorite",
  initialState,
  reducers: (create) => ({
    addToFavorite: create.reducer(
      (state, action: PayloadAction<FavoritedInput>) => {
        if (
          state.items
            .map((item) => item.selectedVariantId)
            .includes(action.payload.item.selectedVariantId)
        ) {
          return;
        }
        state.items.push(action.payload.item);
        state.count = state.items.length;
        localStorage.setItem(
          LocalStorageKeys.FAVORITED_PRODUCTS,
          JSON.stringify(state.items),
        );
      },
    ),
    removeFromFavorite: create.reducer(
      (state, action: PayloadAction<string>) => {
        const variantIdToBeRemoved = action.payload;
        const removeIndex = state.items.findIndex(
          (item) => item.selectedVariantId === variantIdToBeRemoved,
        );
        state.items.splice(removeIndex, 1);
        state.count = state.items.length;
        localStorage.setItem(
          LocalStorageKeys.FAVORITED_PRODUCTS,
          JSON.stringify(state.items),
        );
      },
    ),
  }),
  selectors: {
    selectFavoritedItems: (favorite) => favorite.items,
    selectFavoriteCount: (favorite) => favorite.count,
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export const { selectFavoritedItems, selectFavoriteCount } =
  favoriteSlice.selectors;
