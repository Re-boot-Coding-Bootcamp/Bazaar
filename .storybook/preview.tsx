import React from "react";
import { Roboto } from "next/font/google";

import type { Preview } from "@storybook/react";

import "../src/styles/globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={roboto.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
