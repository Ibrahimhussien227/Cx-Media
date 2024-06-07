"use server";

import { cookies } from "next/headers";

export const postSupport = async ({
  subject,
  message,
}: {
  subject: string;
  message: string;
}) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_SUPPORT_SERVICE_URL}`;
  const cookieStore = cookies();

  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/support-ticket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
    },
    body: JSON.stringify({ subject, message }), // Convert body to JSON string
  });

  return await res.json();
};
