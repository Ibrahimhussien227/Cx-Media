import { ProgressStatuses } from "@/types/enum.constants";
import { WarningCircle, Info, CheckCircle } from "@/utils/icons/index";


export const statusIndicatorStyling = {
  [ProgressStatuses.INPROGRESS]: '#009DFF',
  [ProgressStatuses.DONE]: '#12EF90',
  [ProgressStatuses.ERROR]: '#FF5A5A'
}

export const statusIndicatorIcon = {
  [ProgressStatuses.INPROGRESS] :  Info,
  [ProgressStatuses.DONE] :  CheckCircle,
  [ProgressStatuses.ERROR] :  WarningCircle
}