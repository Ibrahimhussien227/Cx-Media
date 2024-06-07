"use server";

import { cookies } from "next/headers";

const baseUrl = `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getInvestor = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/investor`, {
    headers: getHeaders(),
    next: { tags: ["investor-data"] },
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || "Error load investor");
  }

  return data?.result;
};

export const updateInvestor = async ({ body }: { body: FormData }) => {
  // Call an external API endpoint to update the investor
  const res = await fetch(`${baseUrl}/investor`, {
    method: "PATCH",
    headers: getHeaders(),

    body, // Pass the FormData object as the body
  });

  const data = await res.json();

  return data;
};

export const updateApplicationReview = async ({
  body,
}: {
  body?: FormData;
}) => {
  // Call an external API endpoint to update the investor
  const res = await fetch(`${baseUrl}/submit-application-for-review`, {
    method: "PATCH",
    headers: getHeaders(),
    body, // Pass the FormData object as the body
  });

  const data = await res.json();

  return data;
};

export const createProfile = async () => {
  // Call an external API endpoint to update the investor
  const res = await fetch(`${baseUrl}/create-profile`, {
    method: "POST",
    headers: getHeaders(),
  });
  console.log(res);

  const data = await res.json();
  console.log(data);

  return data;
};
