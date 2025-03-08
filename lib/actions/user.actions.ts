"use server";

import {
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  paymentMethodShema,
} from "../validators";
import { signIn, signOut, auth } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import { z } from "zod";

// Sign in the user with credentials
export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData,
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "Sign in siccessfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: "Invalid email or message" };
  }
};

// Sign user out
export const signOutUser = async () => await signOut();

// Sign up user
export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });
    return { success: true, message: "User registered siccessfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
};

// Get user by ID
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user;
};

// Update the user's address
export const updateUserAddress = async (data: ShippingAddress) => {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found");
    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: "User update successfully",
    };
  } catch (error) {
    return {
      success: false,
      meessage: formatError(error),
    };
  }
};

// Update uses's payment method
export const updateUserPaymentMethod = async (
  data: z.infer<typeof paymentMethodShema>,
) => {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");
    const paymentMethod = paymentMethodShema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated siccessfully",
    };
  } catch (error) {
    return {
      success: false,
      meessage: formatError(error),
    };
  }
};
