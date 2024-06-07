

export enum ProgressStatuses {
  IDLE = 'idle',
  INPROGRESS = 'in-progress', 
  DONE= 'done',
  ERROR= 'error',
}

export enum SellerTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
  REGISTERED = 'REGISTERED' // default initial value
}
export enum ApplicationReviewStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  PENDING_REVIEW = 'PENDING_REVIEW',
  REJECTED = 'REJECTED',
}

export enum CampaignReviewStatus {
  DRAFT = 'DRAFT',
  REJECTED = 'REJECTED',
  PENDING_REVIEW = 'PENDING REVIEW',
  PENDING_FEE = 'PENDING FEE',  
  APPROVED_TO_PUBLISH = 'APPROVED TO PUBLISH'
}

export enum KYCStatusEnum {
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  INVALID = "INVALID",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  RESTRICTED = "RESTRICTED"
}

export enum campaignStates {
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
  TRASH = "TRASH"
}

export enum campaignStatus {
  AVAILABLE = "AVAILABLE",
  FUNDED = "FUNDED",
  EXITED = "EXITED",
  REFUNDED = "REFUNDED"
}

export enum completionStatus {
  PENDING = 'PENDING',
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
}

export enum fileKeysEnum {
  titleDeedFile = "titleDeedFile",
  valuationReportFile = "valuationReportFile",
  rentalContractsFile = "rentalContractsFile",
  projectionReportFile = "projectionReportFile",
  assetPhotos = "assetPhotos",
  otherDocuments = "otherDocuments",
}

export enum CampaignManagerStatus {
  INVITED = "INVITED",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED"
}

export enum TelrSessionTypes {
  AddCard = 'add-card',
  Deposit = 'deposit',
  KycPayment = 'kyc-payment',
  CampaignExtend = 'campaign-extend',
  CampaignPayment = 'campaign-payment',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Authorised = 'Authorised',
  Paid = 'Paid',
  Expired = 'Expired',
  Cancelled = 'Cancelled',
  Declined = 'Declined'
}