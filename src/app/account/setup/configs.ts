import { ApplicationReviewStatus, KYCStatusEnum, ProgressStatuses } from "@/types/enum.constants";


export const soloSellerTabOps : IOption[] = [
  {
    value: 'kycStatus',
    display: 'identity verirfication'
  },
  {
    value: 'isRegistrationFeePaid',
    display: 'fee payment'
  }
];

export const BusinessSellerTabOps : IOption[] = [
  {
    value: 'companyDetails',
    display: 'company information'
  },
  {
    value: 'kycStatus',
    display: 'identity verirfication'
  },
  {
    value: 'applicationReviewStatus',
    display: 'application review'
  },
  {
    value: 'isRegistrationFeePaid',
    display: 'fee payment'
  }
];

export const sellerTabStatusMap = {
  kycStatus: {
    [KYCStatusEnum.PENDING]: ProgressStatuses.INPROGRESS,
    [KYCStatusEnum.VERIFIED]: ProgressStatuses.DONE,
    [KYCStatusEnum.INVALID]: ProgressStatuses.IDLE,
    "undefined": ProgressStatuses.IDLE
  },
  isRegistrationFeePaid: {
    'true': ProgressStatuses.DONE,
    'false': ProgressStatuses.IDLE,
    'undefined': ProgressStatuses.IDLE
  },
  companyDetails (user: ISellerProfile){ // TODO: a more advanced checker once required fields thing is discussed
    if (!user.companyDetails){
      return ProgressStatuses.IDLE;
    }
    return ProgressStatuses.DONE;
  },
  applicationReviewStatus: {
    [ApplicationReviewStatus.APPROVED]: ProgressStatuses.DONE,
    [ApplicationReviewStatus.PENDING_REVIEW]: ProgressStatuses.INPROGRESS,
    [ApplicationReviewStatus.REJECTED]: ProgressStatuses.ERROR,
    'undefined': ProgressStatuses.IDLE,
    "null":  ProgressStatuses.IDLE,
  }
}