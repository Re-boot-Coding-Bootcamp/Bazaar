import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      {
        image: "https://murad-public-files.s3.amazonaws.com/bazaar/bg-2.png",
        overlayText: (
          <>
            <p className="w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              doloribus quidem ratione aperiam at officiis dolorem, aut veniam
              sequi.
            </p>
          </>
        ),
        overlayPosition: "left-top",
      },
      {
        image: "https://murad-public-files.s3.amazonaws.com/bazaar/bg-3.png",
        overlayText: (
          <>
            <p className="w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              doloribus quidem ratione aperiam at officiis dolorem, aut veniam
              sequi.
            </p>
          </>
        ),
        overlayPosition: "right-top",
      },
      {
        image: "https://murad-public-files.s3.amazonaws.com/bazaar/bg-4.png",
        overlayText: (
          <>
            <p className="w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              doloribus quidem ratione aperiam at officiis dolorem, aut veniam
              sequi.
            </p>
          </>
        ),
        overlayPosition: "left-bottom",
      },
      {
        image: "https://murad-public-files.s3.amazonaws.com/bazaar/bg-5.png",
        overlayText: (
          <>
            <p className="w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              doloribus quidem ratione aperiam at officiis dolorem, aut veniam
              sequi.
            </p>
          </>
        ),
        overlayPosition: "right-bottom",
      },
      {
        image: "https://murad-public-files.s3.amazonaws.com/bazaar/bg-1.png",
        overlayText: (
          <>
            <p className="w-96 md:w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              doloribus quidem ratione aperiam at officiis dolorem, aut veniam
              sequi.
            </p>
          </>
        ),
        overlayPosition: "center",
      },
    ],
  },
};
