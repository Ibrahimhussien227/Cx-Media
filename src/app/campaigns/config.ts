
import { CampaignReviewStatus, campaignStates, campaignStatus } from "@/types/enum.constants";

export const reviewStatusColorMap = {
  [CampaignReviewStatus.PENDING_REVIEW]: 'yellow',
  [CampaignReviewStatus.REJECTED]: 'red',
  [CampaignReviewStatus.APPROVED_TO_PUBLISH]: 'green',
  [CampaignReviewStatus.DRAFT]: 'faint',
  [CampaignReviewStatus.PENDING_FEE]: 'green'

};


export const tableColumns = {
  [campaignStates.UNPUBLISHED]: [
    {
      id: 1,
      key: "assetDetails",
      label: "Listing",
    },
    {
      id: 2,
      key: "reviewStatus",
      label: "Status",
    },
    {
      id: 3,
      key: "updatedAt",
      label: "Last Update",
    },
  ],
  [campaignStatus.AVAILABLE]: [
    {
      id: 1,
      key: "assetDetails",
      label: "Listing",
    },
    {
      id: 2,
      key: "fundStatus",
      label: "Status",
    },
    {
      id: 3,
      key: "fundRaised",
      label: "Fund Raised",
    },
    {
      id: 4,
      key: "NumberOfInvestors",
      label: "Investors",
    },
    {
      id: 5,
      key: "campaignCloseTimestamp",
      label: "campaign closes on",
    },
    {
      id: 6,
      key: "updatedAt",
      label: "Last Update",
    },
  ],
  [campaignStatus.FUNDED]: [
    {
      id: 1,
      key: "assetDetails",
      label: "Listing",
    },
    {
      id: 3,
      key: "fundRaised",
      label: "Fund Raised",
    },
    {
      id: 4,
      key: "NumberOfInvestors",
      label: "Investors",
    },
    {
      id: 6,
      key: "updatedAt",
      label: "Last Update",
    },
  ]
}


