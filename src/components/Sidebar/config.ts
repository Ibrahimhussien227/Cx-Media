export const sidebarItems = [
  {
    title: "dashboard.title",
    to: "/",
    icon: "Dashboard",
    type: "available",
    items: [],
  },
  {
    title: "notifications.title",
    to: "/notifications",
    icon: "Bell",
    items: [],
  },
  {
    title: "administrators.title",
    to: "/administrators",
    icon: "ChartPieSlice",
    items: [],
  },
  {
    title: "userAccounts.title",
    to: ".",
    icon: "Users",
    items: [
      {
        title: "allUsers.title",
        to: "/user-accounts/all",
      },
      {
        title: "applications.title",
        to: "/user-accounts/applications",
      },
      {
        title: "investors.title",
        to: "/user-accounts/investors",
      },
      {
        title: "sellers.title",
        to: "/user-accounts/sellers",
      },
    ],
  },
  {
    title: "campaigns.title",
    to: ".",
    icon: "Notebook",
    items: [
      {
        title: "listingApplications.title",
        to: "/campaigns/applications",
      },
      {
        title: "allCampaigns.title",
        to: "/campaigns/all",
      },
    ],
  },
  {
    title: "financials.title",
    to: ".",
    icon: "ChartBar",
    items: [
      {
        title: "financialsPayout.title",
        to: "/financials/payouts",
      },
      {
        title: "financialsAll.title",
        to: "/financials/all",
      },
    ],
  },
  {
    title: "transfers.title",
    to: ".",
    icon: "FileText",
    items: [
      {
        title: "transfersWindow.title",
        to: "/transfers/windows",
      },
      {
        title: "transfersTrades.title",
        to: "/transfers/trades",
      },
    ],
  },
  {
    title: "settings.title",
    to: "/settings",
    icon: "GearSix",
    items: [],
  },
];
