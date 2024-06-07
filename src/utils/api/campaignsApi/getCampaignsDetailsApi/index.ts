import { cookies } from "next/headers";

const baseUrl = `${process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL}`;

const getHeaders = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getCampaignsDetails = async ({ id }: { id: string }) => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/${id}`, {
    next: { revalidate: 1707901586 },

    headers: getHeaders(),
  });

  if (!res.ok) {
    return { error: { message: "Something Went Wrong" } };
  }

  const data = await res.json();

  return data.data;
};

export const getCampaignTimeLine = async ({ id }: { id: string }) => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/timeline?campaignId=${id}`, {
    next: { revalidate: 1707901586 },

    headers: getHeaders(),
  });

  if (!res.ok) {
    return { error: { message: "Something Went Wrong" } };
  }

  const data = await res.json();

  return data.data;
};
