"use server";

import { cookies } from "next/headers";

const baseUrl = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getUser = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/profile/me`, {
    headers: getHeaders(),
  });

  const data = await res.json();

  if (data.error) {
    return { error: { message: data.message } };
  }

  return data.data;
};

export const logoutApi = async () => {
  const cookieStore = cookies();
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: getHeaders(),
    });

    await res.json();
    cookieStore.delete("accessToken");
  } catch (error) {
    console.log("Error:", error);
  }
};
