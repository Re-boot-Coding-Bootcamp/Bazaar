import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}
const CartItem: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image, price, color, size } = product;
  const [quantity, setQuantity] = useState(product.quantity);

  const incrementQty = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      id="cart-item-container"
      className="mx-auto max-w-3xl overflow-hidden rounded bg-white shadow-md"
    >
      <div
        id="item-name-container"
        className="justify-items-start border-b border-gray-200 pb-1 md:flex"
      >
        <div className="md:shrink-0">
          <img
            src={image}
            alt="image description"
            className="h-48 w-full object-cover pr-4 md:h-full md:w-48"
          ></img>
        </div>
        <div className="flex flex-col justify-start pr-10 pt-1">
          <a href="" className="mb-2 text-2xl font-black">
            {name}
          </a>
          <div className="flex flex-col gap-1">
            <text className="text-sm font-thin text-slate-500">{color}</text>
            <text className="mb-10 text-sm font-thin text-slate-500">
              {size}
            </text>
            <div className="justify-content-between flex items-center">
              <button
                type="button"
                className="round border border-black bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
                onClick={decrementQty}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={10}
                className="border border-y-black py-1"
                value={quantity}
              ></input>
              <button
                type="button"
                className="round border border-black bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
                onClick={incrementQty}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pl-10 pr-1 pt-1">
          <text className="py-1 pb-1 text-2xl font-black">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </text>
          <div className="flex flex-row">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <a href="" className="mb-1 underline">
              Remove item
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
