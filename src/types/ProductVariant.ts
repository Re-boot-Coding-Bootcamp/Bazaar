export type ProductVariant = {
  productName: string;
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  images: { url: string }[];
};
