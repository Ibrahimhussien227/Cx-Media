import { CampaignReviewStatus, ProgressStatuses, completionStatus } from "@/types/enum.constants";
import { getAmentiesStatus, getDocumentsStatus, getFinancialStatus, getImagesStatus, getLocationStatus, getOverviewStatus } from "./utils";



export const campaignTabOps : IOption[] = [
  {
    value: 'propertyDetails',
    display: 'property details'
  },
  {
    value: 'applicationReviewStatus',
    display: 'application review'
  },
  {
    value: 'isFeePaid',
    display: 'fee payment'
  },
  {
    value: 'campaignPublishingTimestamp',
    display: 'Publish Campaign'
  },
];


export const campaignTabStatusMap = {
  propertyDetails: (apiCampaignDetails:ICampaignDetails)=> {
    const allStatuses = [
      getOverviewStatus(apiCampaignDetails),
      getAmentiesStatus(apiCampaignDetails), 
      getLocationStatus(apiCampaignDetails), 
      getImagesStatus(apiCampaignDetails),
      getDocumentsStatus(apiCampaignDetails),
      getFinancialStatus(apiCampaignDetails)
    ];
    
    if (allStatuses.every(status=> status === completionStatus.COMPLETE)){
      return ProgressStatuses.DONE
    }
    if (allStatuses.some(status=> status === completionStatus.COMPLETE)){
      return ProgressStatuses.INPROGRESS
    }
    return ProgressStatuses.IDLE
  },
  applicationReviewStatus: {
    [CampaignReviewStatus.PENDING_FEE]: ProgressStatuses.DONE,
    [CampaignReviewStatus.APPROVED_TO_PUBLISH]: ProgressStatuses.DONE,
    [CampaignReviewStatus.PENDING_REVIEW]: ProgressStatuses.INPROGRESS,
    [CampaignReviewStatus.REJECTED]: ProgressStatuses.ERROR,
    [CampaignReviewStatus.DRAFT]: ProgressStatuses.IDLE,
    'undefined': ProgressStatuses.IDLE
  },
  isFeePaid: (apiCampaignDetails:ICampaignDetails)=> {
    return apiCampaignDetails.reviewStatus === CampaignReviewStatus.APPROVED_TO_PUBLISH? ProgressStatuses.DONE : ProgressStatuses.IDLE
  },
  campaignPublishingTimestamp: {
    '[object Date]': ProgressStatuses.DONE, // TODO: build a checker in the future
    'undefined': ProgressStatuses.IDLE,
  }
}