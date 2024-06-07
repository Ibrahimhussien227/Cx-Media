"use server";

import { updateApplicationReview } from "@/utils/api/InvestorApi";
import { revalidateTag } from "next/cache";

export const SubmitDocument = async (formData?: FormData) => {
  await updateApplicationReview({ body: formData });
  revalidateTag("investor-data");
};
