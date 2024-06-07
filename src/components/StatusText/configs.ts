import { INVESTOR_APPLICATION_STATUS, STATUS } from "@/types/enum.constants";

export const CONTENT = {
  [STATUS.PUBLISHED]: {
    name: "PUBLISHED",
    color: "success-status",
  },
  [STATUS.UNPUBLISH]: {
    name: "UNPUBLISHED",
    color: "pending-status",
  },
  [STATUS.PENDING]: {
    name: "PENDING",
    color: "pending-status",
  },
  [STATUS.PENDING_FEE]: {
    name: "PENDING FEE",
    color: "sky-status",
  },
  [STATUS.PENDING_REVIEW]: {
    name: "PENDING REVIEW",
    color: "pending-status",
  },
  [STATUS.DRAFT]: {
    name: "DRAFT",
    color: "pale-status",
  },
  [STATUS.ACTIVE]: {
    name: "ACTIVE",
    color: "success-status",
  },
  [STATUS.SCHEDULED]: {
    name: "SCHEDULED",
    color: "sky-status",
  },
  [STATUS.COMPLETE]: {
    name: "COMPLETE",
    color: "success-status",
  },
  [STATUS.INCOMPLETE]: {
    name: "INCOMPLETE",
    color: "sky-status",
  },
  [STATUS.APPROVED_TO_PUBLISH]: {
    name: "APPROVED TO PUBLISH",
    color: "green-status",
  },
  [STATUS.REJECTED]: {
    name: "REJECTED",
    color: "error-status",
  },
  [STATUS.LIVE]: {
    name: "LIVE",
    color: "pale-status",
  },
  [STATUS.CLOSED]: {
    name: "CLOSED",
    color: "error-status",
  },
  [STATUS.LISTED]: {
    name: "LISTED",
    color: "pale-status",
  },
  [STATUS.QUEUED]: {
    name: "QUEUED",
    color: "sky-status",
  },
  [STATUS.CANCELLED]: {
    name: "CANCELLED",
    color: "error-status",
  },
  [STATUS.LISTING_REMOVED]: {
    name: "LISTING REMOVED",
    color: "pale-status",
  },
  [STATUS.PROCESSING]: {
    name: "PROCESSING",
    color: "pending-status",
  },
  [STATUS.FAILED]: {
    name: "FAILED",
    color: "error-status",
  },
  [STATUS.INVITED]: {
    name: "INVITED",
    color: "pending-status",
  },
  [STATUS.BLOCKED]: {
    name: "BLOCKED",
    color: "error-status",
  },
  [STATUS.VERIFIED]: {
    name: "VERIFIED",
    color: "success-status",
  },
  [INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED]: {
    name: "ACTION REQUIRED",
    color: "error-status",
  },
  [INVESTOR_APPLICATION_STATUS.UNDER_REVIEW]: {
    name: "UNDER REVIEW",
    color: "sky-status",
  },
};
