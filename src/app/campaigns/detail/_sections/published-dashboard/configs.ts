import { formatDate } from "@/utils/formatDate";


export const campaignLogs = [
  {
    header: "campaign id",
    accessorKey: 'campaignId'
  },
  {
    header: 'published on',
    accessorKey: 'campaignPublishingTimestamp',
    formatter: (dateStr: any)=> dateStr && formatDate(dateStr, ', ', ['d', 'm', 'y'])
  },
  {
    header: 'last updated',
    accessorKey: 'updatedAt',
    formatter: (dateStr: any)=> dateStr && formatDate(dateStr, ', ')
  }
];