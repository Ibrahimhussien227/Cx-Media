export const MODALS = {
  ACCOUNT_VERIFICATION_PENDING: {
    title: "Account Verification Pending",
    desc: "Sorry! You cannot make an investment until your account has been verified. Please complete your KYC verification in order to invest.",
    button: {
      cancel: "VERIFY LATER",
      submit: "VERIFY NOW",
    },
    href: "/profile/verify",
  },
  balance: {
    title: "Balance Insufficient",
    desc: "Sorry! You do not have the required balance to make this investment. Please top up your wallet to invest.",
    button: {
      cancel: "TOP UP LATER",
      submit: "TOP UP NOW",
    },
    href: "/profile/manage-wallet",
  },
  cap: {
    title: "Investment Cap Exceeded",
    desc: "Sorry! You cannot make this investment as you have exceeded your annual investment cap. If you wish to make this investment you can upgrade your account and invest with nolimits",
    button: {
      cancel: "UPGRADE LATER",
      submit: "UPGRADE NOW",
    },
    href: "/profile/manage-investment",
  },
};
