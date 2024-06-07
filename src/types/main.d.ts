interface IOption {
  value: string;
  display: string;
  sortOrder?: string;
}

interface IHeadCell {
  id: number;
  key: string;
  label: string;
}

interface ISearchParamsProps {
  searchParams: { [key: string]: string };
}

interface ICampaignData {
  data: {
    campaignState?: string;
    campaignId: string;
    assetDetails: {
      assetMediaFiles: { filePath: string; fileKey: string }[];
      assetName: string;
      assetLocation: {
        assetGeolocationLat: string;
        assetGeolocationLong: string;
        assetAddressOne: string;
        assetCity: string;
        assetLocationArea: string;
      };
    };
    campaignStatus: string;
    financialDetails: {
      sharePrice?: number;
      propertyPrice: number;
      noOfShares: number;
      minimumInvestmentAmount: number;
      minimumInvestmentShare: number;
      noOfSharesRemaining: number;
      projectedAnnualAppreciation: number;
      projectedAnnualizedReturn: number;
      projectedGrossYield: number;
      projectedNetYield: number;
    };
    campaignPublishingTimestamp: string;
  };
}

interface ILeanCustomer {
  appUserId: string;
  customerId: string;
  investorId: string;
  entityId: string;
  isNameMatched: boolean;
  permissionsGranted: string[];
  createdAt: string;
  updatedAt: string;
}

interface IPaymentMethod {
  id: string;
  investorBankId: string;
  cardId: string;
  userId: string;
  isPrimary: boolean;
  isDeleted: boolean;
  bankDetail?: IBankDetail;
  cardDetail?: ICardDetail
}

interface IBankDetail {
  investorBankId: string;
  name: string;
  accountId?: string | null;
  accountNumber: string;
  currencyCode?: string | null;
  type?: string | null;
  iban?: string | null;
  bankIdentifier?: string | null;
  customerId?: string;
  investorId?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  swiftCode?: string | null;
  payoutDestinationId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface ICardDetail {
  cardId: string;
  cardNumberLast4: string;
  cardType: string;
}

interface IWallet {
  walletId: string,
  "userId": string,
  "investorId": string,
  "currencyAbbr": string,
  "balance": number,
  "balanceString": string
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

interface ITransaction {
  transactionId: string;
  investorId: string;
  currencyAbbr: string;
  amount: number;
  amountString: string;
  description: string;
  transactionType: string;
  paymentType: string;
  transactionStatus: string;
  transactionSubtask: string;
  createdAt: string;
  updatedAt: string;
}
