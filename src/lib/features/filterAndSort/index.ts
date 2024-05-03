import { createAppSlice } from "~/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ProductFilter } from "~/types";
import { FilterOptions, SortOptions } from "~/constants";

export interface FilterAndSortSliceState {
  filters: ProductFilter[];
  sortBy?: string;
}

const initialState: FilterAndSortSliceState = {
  filters: FilterOptions,
  sortBy: SortOptions[0]?.value,
};

interface FilterInput {
  filterId: string;
  optionValue: string;
}

export const filterAndSortSlice = createAppSlice({
  name: "filterAndSort",
  initialState,
  reducers: (create) => ({
    updateFilters: create.reducer(
      (state, action: PayloadAction<FilterInput>) => {
        state.filters = state.filters.map((filter) =>
          filter.id === action.payload.filterId
            ? {
                ...filter,
                options: filter.options.map((option) =>
                  option.value === action.payload.optionValue
                    ? { ...option, checked: !option.checked }
                    : option,
                ),
              }
            : filter,
        );
      },
    ),
    updateSortBy: create.reducer((state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    }),
    resetFilters: create.reducer((state) => {
      state.filters = initialState.filters;
    }),
    resetSortBy: create.reducer((state) => {
      state.sortBy = initialState.sortBy;
    }),
    resetFiltersAndSortBy: create.reducer((state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    }),
  }),
  selectors: {
    selectFilters: (filterAndSort) => filterAndSort.filters,
    selectSortBy: (filterAndSort) => filterAndSort.sortBy,
  },
});

export const {
  updateFilters,
  updateSortBy,
  resetFilters,
  resetSortBy,
  resetFiltersAndSortBy,
} = filterAndSortSlice.actions;
export const { selectFilters, selectSortBy } = filterAndSortSlice.selectors;
