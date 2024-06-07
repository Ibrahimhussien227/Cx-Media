"use server";

import { updateInvestor } from "@/utils/api/InvestorApi";
import { revalidatePath, revalidateTag } from "next/cache";

export const SubmitForm = async (data: FormData): Promise<void> => {
  // code here...

  await updateInvestor({ body: data });
  revalidateTag("investor-data");
  revalidatePath("/profile/verify");
};
