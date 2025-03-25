"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { formatError } from "@/lib/utils";
import { revalidateTag } from "next/cache";

// get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
};

// Get all products
export const getAllProducts = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  query,
  limit = PAGE_SIZE,
  page,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) => {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
};

//  Delete a product
export const deleteProduct = async (id: string) => {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExist) throw new Error("Product not found");

    await prisma.product.delete({ where: { id } });
    revalidateTag("/admin/products");

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
