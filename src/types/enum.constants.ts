export enum STATUS {
  UNPUBLISH = "UNPUBLISH",
  PUBLISHED = "PUBLISHED",
  PENDING = "PENDING",
  PENDING_FEE = "PENDING FEE",
  PENDING_REVIEW = "PENDING REVIEW",
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  SCHEDULED = "SCHEDULED",
  REJECTED = "REJECTED",
  APPROVED_TO_PUBLISH = "APPROVED TO PUBLISH",
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  LIVE = "LIVE",
  CLOSED = "CLOSED",
  LISTED = "LISTED",
  QUEUED = "QUEUED",
  CANCELLED = "CANCELLED",
  LISTING_REMOVED = "LISTING_REMOVED",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
  INVITED = "INVITED",
  BLOCKED = "BLOCKED",
  VERIFIED = "VERIFIED",
}

export enum KYCStatusEnum {
  PENDING = "request.pending",
  ACCEPTED = "ACCEPTED",
  VERIFIED = "verification.accepted",
  UNVERIFIED = "verification.declined",
  CANCELLED = "verification.cancelled",
}

export enum LeanFlowEndStatus {
  SUCCESS = "SUCCESS",
  CANCELLED = "CANCELLED",
  ERROR = "ERROR",
}

export enum TelrSessionTypes {
  AddCard = "add-card",
  Deposit = "deposit",
  KycPayment = "kyc-payment",
  CampaignExtend = "campaign-extend",
  CampaignPayment = "campaign-payment",
}

export enum PaymentStatus {
  Pending = "Pending",
  Authorised = "Authorised",
  Paid = "Paid",
  Expired = "Expired",
  Cancelled = "Cancelled",
  Declined = "Declined",
}

export enum INVESTOR_APPLICATION_STATUS {
  UNDER_REVIEW = "UNDER_REVIEW",
  COMPLETE = "COMPLETE",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  VERIFIED = "VERIFIED",
  ACTION_REQUIRED = "ACTION_REQUIRED",
  DRAFT = "DRAFT",
}
