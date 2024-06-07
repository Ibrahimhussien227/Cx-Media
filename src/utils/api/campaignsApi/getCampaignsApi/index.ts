"use server";

import { cookies } from "next/headers";

import {
  FILTEROPTIONS,
  TABOPTIONS,
} from "@/app/[locale]/(explore)/_components/NavFilters/PropertyFilter/config";

export const getCampaigns = async ({
  searchParams,
  page,
}: {
  searchParams: { [type: string]: string };
  page?: number;
}) => {
  const { sortBy, sortOrder, search, type } = searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_CAMPAIGN_SERVICE_URL;

  const params = new URLSearchParams();

  if (search) {
    params.append("searchValue", search);
  }

  if (sortBy && FILTEROPTIONS.find((op) => op.value === sortBy)) {
    params.append("sortBy", sortBy);
  }

  if (sortOrder && FILTEROPTIONS.find((op) => op.sortOrder === sortOrder)) {
    params.append("sortOrder", sortOrder);
  }

  if (type && TABOPTIONS.find((op) => op.value === type)) {
    params.append("campaignStatus", type);
  } else {
    params.append("campaignStatus", "AVAILABLE");
  }

  if (page && page !== 0) {
    params.append("page", String(page));
  } else {
    params.append("page", "1");
  }

  const queryString = params.toString();

  const url = `${baseUrl}/list${queryString ? `?${queryString}` : ""}`;

  const cookieStore = cookies();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || "Error load campaigns");
  }

  return data;
};
