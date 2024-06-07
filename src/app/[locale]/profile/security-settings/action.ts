import { logoutApi } from "@/utils/api/userApi";
import { redirect } from "next/navigation";

export const handleSignout = async () => {
  "use server";
  await logoutApi();
  redirect(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
};
