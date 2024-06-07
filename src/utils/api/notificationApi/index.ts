import { cookies } from "next/headers";

export const getNotifications = async () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVICE_URL}`;
  //   const cookieStore = cookies();

  const cookieStore = cookies();

  // Call an external API endpoint to get posts
  const res = await fetch(`${baseUrl}/notifications?api-key=" "`, {
    next: { revalidate: 1707901586 },
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
    },
  });

  const data = await res.json();

  return data.data;
};
