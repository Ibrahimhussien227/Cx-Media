"use server";

import { cookies } from "next/headers";

const baseUrl = `${process.env.NEXT_PUBLIC_KYC_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
export const getUseKycInfo = async () => {
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(`${baseUrl}/user-kyc-info/get-user-kyc-info`, {
      headers: getHeaders(),
      next: { tags: ["kyc"] },
    });

    // if (!res.ok) {
    //   return { error: { message: "Something Went Wrong" } };
    // }
    const data = await res.json();

    if (data.error) {
      return { error: { message: data.error } };
    }

    return data.result;
  } catch (err) {
    console.error(err);
  }
};

export const getIframe = async () => {
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(`${baseUrl}/user-kyc-info/get-iframe`, {
      headers: getHeaders(),

      next: { tags: ["iframe"] },
    });

    const data = await res.json();
    if (data.error) {
      return { error: { message: data.error } };
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};
