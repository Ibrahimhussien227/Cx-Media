"use server";

import { cookies } from "next/headers";

const baseUrl = `${process.env.NEXT_PUBLIC_INVESTMENT_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const validateInvestment = async ({
  params,
}: {
  params: { campaignId: string; requestedShares: number };
}) => {
  try {
    // Call an external API endpoint to update the investor
    const res = await fetch(
      `${baseUrl}/validation?campaignId=${params.campaignId}&requestedShares=${params.requestedShares}`,
      {
        headers: getHeaders(),
      }
    );

    const data = await res.json();

    if (data.error) {
      return { error: { message: data.message } };
    }

    return data?.data;
  } catch (err) {
    console.error(err);
  }
};
