export const campaigns = (campaigns: ICampaignData["data"][]) => {
  return campaigns.map((item) => {
    return {
      asset: {
        name: item.assetDetails?.assetName,
        id: item?.campaignId,
        assetMediaFiles: item.assetDetails?.assetMediaFiles,
      },
      noOfShares: {
        remaining: item.financialDetails?.noOfSharesRemaining,
        total: item.financialDetails?.noOfShares,
      },
      propertyPrice: item.financialDetails?.propertyPrice,
      projectedAnnualizedReturn:
        item.financialDetails?.projectedAnnualizedReturn,
      projectedAnnualAppreciation:
        item.financialDetails?.projectedAnnualAppreciation,
      projectedGrossYield: item.financialDetails?.projectedGrossYield,
      projectedNetYield: item.financialDetails?.projectedNetYield,
      minimumInvestment: {
        amount: item.financialDetails?.minimumInvestmentAmount,
        shares: item.financialDetails?.minimumInvestmentShare,
      },
    };
  });
};
