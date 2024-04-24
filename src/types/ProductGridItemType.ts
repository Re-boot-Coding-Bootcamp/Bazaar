import { type RouterOutputs } from "~/trpc/shared";

export type ProductGridItemType =
  RouterOutputs["product"]["getProducts"][number];
