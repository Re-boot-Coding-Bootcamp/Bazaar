import { XMarkIcon } from "@heroicons/react/24/solid";
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

  const totalPrice = price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= 10 && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div
      id="cart-item-container"
      className="w-full rounded bg-white shadow-md md:flex"
    >
      <div id="image-container" className="md:shrink-0">
        <img
          src={image}
          alt="image description"
          className="aspect-square w-full object-cover md:w-48"
        />
      </div>
      <div id="content-container" className="flex w-full justify-between p-4">
        <div
          id="content-left-container"
          className="flex flex-col justify-between gap-4"
        >
          <div>
            <a href="" className="mb-2 text-2xl font-black">
              {name}
            </a>
            <p className="text-sm font-thin text-slate-500">{color}</p>
            <p className="text-sm font-thin text-slate-500">{size}</p>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="round border border-black bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
              onClick={decrementQty}
            >
              -
            </button>
            <input
              type="text"
              min={1}
              max={10}
              className="max-w-8 border border-y-black py-1 text-center"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              type="button"
              className="round border border-black bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
              onClick={incrementQty}
            >
              +
            </button>
          </div>
        </div>
        <div
          id="content-right-container"
          className="flex flex-col items-end justify-between"
        >
          <p className="text-2xl font-black">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <button className="flex underline hover:text-red-500">
            <XMarkIcon className="h-6 w-6" />
            Remove item
          </button>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
