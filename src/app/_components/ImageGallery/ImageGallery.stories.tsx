import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "./ImageGallery";

const meta: Meta = {
  title: "Component/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const imageUrls = [
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8e475055-a3cf-464f-8bd5-23ff8dc0f243/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6c5db0c6-6ace-47e5-bc50-8b3a116297ff/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/390e464c-bb34-42c5-8464-6890dd5b593e/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7764fbd-4db3-4c20-b77e-090dd17052bd/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1151b0fb-16c7-49e3-9d18-3be255778b8f/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/98f66fa2-e0e9-40e8-9c5d-d71ce1136b45/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/98f74d0a-11fb-444c-8706-8c8b9510f758/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8e475055-a3cf-464f-8bd5-23ff8dc0f243/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6c5db0c6-6ace-47e5-bc50-8b3a116297ff/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/390e464c-bb34-42c5-8464-6890dd5b593e/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7764fbd-4db3-4c20-b77e-090dd17052bd/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1151b0fb-16c7-49e3-9d18-3be255778b8f/air-jordan-1-low-womens-shoes-rJrHLw.png",
  "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/98f66fa2-e0e9-40e8-9c5d-d71ce1136b45/air-jordan-1-low-womens-shoes-rJrHLw.png",
];

export const Default: Story = {
  args: {
    imageUrls,
  },
  // decorators: [
  //   (Story) => (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         width: 700,
  //         height: 640,
  //       }}
  //     >
  //       <Story />
  //     </div>
  //   ),
  // ],
};
