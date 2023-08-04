export type AddBuyProductType = {
  name: string;
  price: number;
  description: string;
  category: "mobile" | "laptop" | "gadget";
  image: string;
  user_id: number;
};
export type AddShopProduct = {
  name: string;
  price: number;
  description: string;
  category: "shop";
  image: string;
  user_id: number;
  edition: string;
};
export type GetProduct = {
  initial: boolean;
  category: "mobile" | "laptop" | "gadget"|"shop";
};
