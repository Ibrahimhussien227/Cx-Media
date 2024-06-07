import Cookies from "js-cookie";

const baseUrl = `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}`;

export const checkPaymentStatus = async (
  orderRef: string
): Promise<{ order: IPaymentOrder }> => {
  try {
    const resp = await fetch(`${baseUrl}/telr/check-payment-status`, {
      method: "POST",
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      body: JSON.stringify({ orderRef }),
    });

    const data = await resp.json();

    if (data.error) throw data;

    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
