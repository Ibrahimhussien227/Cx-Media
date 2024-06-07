import { TABOPTIONS } from "@/app/[locale]/invest/config";

export const getCampaigns = async ({
  searchParams,
}: {
  searchParams: { [type: string]: string };
  page?: number;
}) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL}`;

  const { type } = searchParams;
  console.log(type);

  const params = new URLSearchParams();

  if (type && TABOPTIONS.find((op) => op.value === type)) {
    params.append("campaignStatus", type);
  } else {
    params.append("campaignStatus", "AVAILABLE");
  }

  const queryString = params.toString();

  const url = `${baseUrl}${queryString ? `?${queryString}` : ""}`;

  // Call an external API endpoint to get posts
  const res = await fetch(url, { next: { revalidate: 1707901586 } });

  const data = await res.json();

  return data;
};
