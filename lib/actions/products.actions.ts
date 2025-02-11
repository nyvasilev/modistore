"use server";
import { prisma } from "@/db/prisma";
import { converToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return converToPlainObject(data);
}

// Get single product by it's sluга

export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
};
