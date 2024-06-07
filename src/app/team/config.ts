
import { CampaignManagerStatus } from "@/types/enum.constants";

export const reviewStatusColorMap = {
  [CampaignManagerStatus.INVITED]: 'yellow',
  [CampaignManagerStatus.BLOCKED]: 'red',
  [CampaignManagerStatus.ACTIVE]: 'green',

};


export const tableColumns = [

 
    {
      id: 1,
      key: "campaignManagerName",
      label: "USER NAME",
    },
    {
      id: 2,
      key: "status",
      label: "Status",
    },
    {
      id: 2,
      key: "emailId",
      label: "EMAIL",
    },
    {
      id: 2,
      key: "phoneNumber",
      label: "PHONE NUMBER",
    },
    {
      id: 2,
      key: "accountId",
      label: "ACCOUNT ID",
    },
    {
      id: 3,
      key: "updatedAt",
      label: "Last Update",
    }
  
  ]


