import type { Meta, StoryObj } from "@storybook/react";

import ProductGrid from "./ProductGrid";

const meta: Meta<typeof ProductGrid> = {
  title: "Components/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    products: [
      {
        id: "1",
        imageUrl:
          "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg",
        name: "Product 1",
        price: 25.99,
        url: "#",
      },
      {
        id: "2",
        imageUrl:
          "https://www.rollingstone.com/wp-content/uploads/2020/09/Screen-Shot-2020-09-12-at-3.20.08-PM-e1599938476848.png",
        name: "Product 2",
        price: 45.5,
        url: "#",
      },
      {
        id: "3",
        imageUrl:
          "https://reviewed-com-res.cloudinary.com/image/fetch/s--iL3VTYYE--/b_white,c_fill,cs_srgb,f_auto,fl_progressive.strip_profile,g_auto,h_729,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1686778972972/nike-sneakers-hero.jpg",
        name: "Product 3",
        price: 60.0,
        url: "#",
      },
      {
        id: "4",
        imageUrl:
          "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/XUM5G4JKNBCLRAB262V7UZ5T7A.jpg",
        name: "Product 4",
        price: 30.0,
        url: "#",
      },
    ],
    isLoading: false,
  },
};

export default meta;

type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {};

export const LoadingState: Story = {
  args: {
    products: [],
    isLoading: true,
  },
};
