
const {
  KYCStatusEnum,
  ProgressStatuses,
  SellerTypeEnum,
  ApplicationReviewStatus,
  campaignStatus,
  CampaignReviewStatus,
  campaignStates,
  completionStatus,
  fileKeysEnum,
  PaymentStatus
} = import("./enum.constants");

type actionBtnConfig = {
  text: string,
  onClick?: ()=> void,
  disabled?: boolean;
}

interface IOption {
  value: string;
  display: string
}

interface IProgressTabOption extends IOption {
  status: ProgressStatuses
}

interface ICampaignDetails {
  campaignId: string;
  assetId: string;
  sellerId?: string;
  financialId?: string;
  campaignStatus?: campaignStatus;
  isFeePaid?: boolean;
  campaignState?: campaignStates;
  reviewStatus?: CampaignReviewStatus;
  campaignCreationTimestamp?: Date;
  campaignApproveTimestamp?: Date;
  campaignPublishingTimestamp?: string;
  campaignCloseTimestamp?: string;
  campaignExitTimestamp?: Date;
  updatedAt?: string;
  updatedBy?: string;
  assetDetails?: IAssetDetails;
  financialDetails?: IFinancialDetails;
  sellerProfile?: ISellerProfile;
}
interface IMediaFiles {
  fileId: string;
  fileKey: fileKeysEnum;
  fileName?: string;
  filePath: string;
  fileType: string;
  fileSize?: number;
  description?: string;
  sellerId?: string;
  uploadTimestamp?: Date;
  createdAt?: Date;
}

interface IAssetDetails {
  assetId?: string;
  assetName?: string;
  assetAppId?: string;
  assetDescription?: string;
  assetType?: string;
  assetInvestmentType?: string;
  assetArea?: number;
  numberOfBed?: number;
  numberOfBath?: number;
  completionStatus?: completionStatus;
  assetMediaFiles?: IAssetMediaFiles[];
  assetAmenities?: IAssetAmenities[];
  assetLocation?: IAssetLocation;
}

interface IAssetMediaFiles extends IMediaFiles {
  isThumbnail?: boolean;
  otherDocumentName?: string;
  assetId?: string;
}

interface IAssetAmenities {
  amenitiesId?: string;
  amenitiesName: string;
  amenitiesType?: string;
  description?: string;
  assetId?: string;
}

interface IFinancialDetails {
  financialId?: string;
  fundingTimeline?: string;
  propertyPrice?: number;
  sharePrice?: number;
  noOfShares?: number;
  noOfSharesSold?: number;
  NoOfSharesRemaining?: number;
  MinimumInvestmentAmount?: number;
  MinimumInvestmentShare?: number;
  projectedAnnualizedReturn?: number;
  projectedAnnualAppreciation?: number;
  projectedGrossYield?: number;
  projectedNetYield?: number;
  NumberOfInvestors?: number;
  FundsRaised?: number;
  CampaignFundingStatusTracker?: string;
  LastUpdateTimestamp?: Date;
  completionStatus?: completionStatus;
}

interface IAssetLocation {
  assetId: string;
  assetLocationId?: string;
  assetAddressOne?: string;
  assetAddressTwo?: string;
  assetCountry?: string;
  assetCity?: string;
  assetLocationArea?: string;
  assetLocation?: string;
  assetGeolocationLat?: string;
  assetGeolocationLong?: string;
  completionStatus?: completionStatus;
}

interface ISellerProfile {
  sellerId?: string;
  userId?: string;
  sellerType?: SellerTypeEnum;
  applicationReviewStatus?: ApplicationReviewStatus;
  kycStatus?: KYCStatusEnum;
  sellerName?: string;
  isRegistrationFeePaid?: boolean;
  lastUpdateTimestamp?: Date;
  updateAt?: Date;
  mediaFiles?: IMediaFiles[];
  companyDetails?: ICompanyDetails;
}
interface IUserState extends ISellerProfile {
  token: string;
};

interface ICompanyDetails {
  companyId?: string;
  companyName?: string;
  isRegistrationLicenseUploaded?: boolean;
  companyAddress_1?: string;
  companyAddress_2?: string;
  country?: string;
  city?: string;
  postalCode?: number;
  companyTaxId?: string;
  isTaxCertificateUploaded?: boolean;
  numOfEmployees?: number;
  sellerId?: string;
  companyRepresentativeDetails?: ICompanyRepresentativeDetails
}

interface ICompanyRepresentativeDetails {
  representativeId?: string;
  companyId?: string ;
  fullLegalName?: string;
  jobProfile?: string;
  employmentLetterUploaded?: boolean;
  identityProofUploaded?: boolean;
  isEmploymentProofUploaded?: boolean;
  officialEmail?: string;
  officialPhoneNumber?: string;
  countryCode?: string;
}

 interface ICampaignManager {
  campaignManagerId?: string;
  userId: string;
  sellerId: string;
  campaignManagerName: string;
  status: CampaignManagerStatus;
  emailId : string;
  phoneNumber?: string;
  lastUpdateTimestamp?: Date;
  pfpPath?: string;
}

interface IFaq {
  question: string;
  answer: string;
  faqId?: string;   
}

interface INotification {
  notificationHeader: string;
  notificationBody: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserKYCInfo {
  _id?: string;
  userId: string;
  reference: string | null;
  metaData: {
    verification_data?: {
      document: {
        dob: string;
        expiry_date: string;
        issue_date: string;
        document_number: string;
        selected_type: string[];
        name: {
          first_name: string;
          last_name: string;
          middle_name: string;
        }
      },
      address: {
        full_address: string;
        country: string
      }
    }
  };
  kycStatus: KYCStatusEnum;
  kycReport?: string | null;
  kycDoc?: string;
  profilePicture?: string | null;
  isExpired?: boolean;
  attemptLeft?: number;
  iframeData: {
    reference: string,
    event: string,
    verification_url: string // to be used if status is pending
 }
}

interface IPaymentOrder {
  ref: string;
  cartId: string;
  amount: string;
  currency: string;
  status: {
    text: PaymentStatus;
    code: number
  }
}

interface IPaymentTransaction {
  txID?: string;
  transactionPurpose ?: string; 
  amount?: number;
  paymentMethod?: string;
  timeStamp?: string;
}
