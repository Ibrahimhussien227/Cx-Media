"use server";

import { cookies } from "next/headers";
const baseUrl = `${process.env.NEXT_PUBLIC_CONFIGURATION_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getFAQ = async () => {
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(`${baseUrl}/faq`, {
      next: { revalidate: 1707901586 },
      method: "GET",
      headers: getHeaders(),
    });

    const data = await res.json();

    if (data.error) {
      return { error: { message: data.message } };
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getInvestorDropdown = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/investorDropDowns`, {
    next: { revalidate: 1707901586 },
    method: "GET",
    headers: getHeaders(),
  });

  const data = await res.json();

  if (data.error) {
    return { error: { message: data.error.message || "Error load configs" } };
  }

  return data?.result;
};
