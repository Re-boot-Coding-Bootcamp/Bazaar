import { type RouterOutputs } from "~/trpc/shared";

export type CartDataType = RouterOutputs["cart"]["getCart"];
export type ExtendedCartItem = NonNullable<
  RouterOutputs["cart"]["getCart"]
>["items"][number];
