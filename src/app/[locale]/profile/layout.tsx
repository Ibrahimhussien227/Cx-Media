import { ReactNode } from "react";

import { createProfile, getInvestor } from "@/utils/api/InvestorApi";
import ClientComponent from "./(verify-account)/verify/_components/ClientComponentForLayout";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function Layout({ children }: { children: ReactNode }) {
  const data = await getInvestor();

  if (data?.length === 0) {
    await createProfile().then(() => {
      revalidateTag("investor-data");
      revalidatePath("/profile");
    });
  }

  return (
    <ClientComponent applicationStatus={data?.applicationStatus}>
      {children}
    </ClientComponent>
  );
}
