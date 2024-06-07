import { formatDate } from "@/utils/formatDate";

export const campaignLogs = [
  {
    header: "campaign id",
    accessorKey: 'campaignId'
  },
  {
    header: 'published on',
    accessorKey: 'campaignPublishingTimestamp',
  },
  {
    header: 'last updated',
    accessorKey: 'updated',
    formatter: (dateStr: any)=> dateStr && formatDate(dateStr, ', ')
  }
];

