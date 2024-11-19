"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const handleSubmit = async (form: FormData) => {
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  console.log(`${email}:${password}`);
  try {
    const response = await fetch(
      "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/account/verify",
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${email}:${password}`),
        },
      }
    );

    if (!response.ok) {
      // Log the full response for debugging
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // In a server action or API route
    cookies().set({
      name: "authtoken",
      value: result.data.idToken,
      httpOnly: true,
      path: "/",
    });

    revalidatePath("/");
  } catch (error) {
    console.error(
      "Authentication error:",
      error instanceof Error ? error.message : error
    );
  }
};
