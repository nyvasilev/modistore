"use server";
import { CartItem } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addItemToCart = async (data: CartItem) => {
  return {
    success: true,
    message: "Item added to cart",
  };
};
