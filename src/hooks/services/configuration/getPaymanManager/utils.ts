export const filterCampaignManager = (result: IPaymentManager[]) => {
  return result.reduce((acc, curr) => {
    acc[curr.key] = curr;
    return acc;
  }, {} as { [key: string]: IPaymentManager });
};
