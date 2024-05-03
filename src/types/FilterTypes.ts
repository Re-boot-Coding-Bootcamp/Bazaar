export interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
  color?: string;
  checkmarkColor?: string;
}

export interface ProductFilter {
  id: string;
  name: string;
  options: FilterOption[];
}

export type ActiveFilterKey = "color" | "size" | "price";
