"use server";
import { useChat } from "ai/react";
import { cookies } from "next/headers";

export const handleLogout = () => {
  cookies().delete("authtoken");
};
