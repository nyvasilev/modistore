import NextAuth from "next-auth";
import { authConfig } from "./aut.config";

export const { auth: middleware } = NextAuth(authConfig);
