import {
  INVESTOR_APPLICATION_STATUS,
  KYCStatusEnum,
} from "@/types/enum.constants";
import { CheckCircle, WarningCircle } from "@/utils/icons";

const RenderIcon = (status: string) => {
  switch (status) {
    case "COMPLETE":
      return (
        <CheckCircle className="ml-2" size={17} color="#12EF90" weight="fill" />
      );
    case INVESTOR_APPLICATION_STATUS.VERIFIED:
      return (
        <CheckCircle className="ml-2" size={17} color="#12EF90" weight="fill" />
      );
    case INVESTOR_APPLICATION_STATUS.ACTION_REQUIRED:
      return (
        <WarningCircle
          className="ml-2"
          size={17}
          color="#FF5A5A"
          weight="fill"
        />
      );
    case INVESTOR_APPLICATION_STATUS.DRAFT:
      return (
        <WarningCircle
          className="ml-2"
          size={17}
          color="#009DFF"
          weight="fill"
        />
      );
    case INVESTOR_APPLICATION_STATUS.UNDER_REVIEW:
      return (
        <WarningCircle
          className="ml-2"
          size={17}
          color="#009DFF"
          weight="fill"
        />
      );
    case INVESTOR_APPLICATION_STATUS.PENDING:
      return (
        <WarningCircle
          className="ml-2"
          size={17}
          color="#FFBA00"
          weight="fill"
        />
      );
    case KYCStatusEnum.PENDING:
      return (
        <WarningCircle
          className="ml-2"
          size={17}
          color="#FFBA00"
          weight="fill"
        />
      );
    case KYCStatusEnum.ACCEPTED:
      return (
        <CheckCircle className="ml-2" size={17} color="#12EF90" weight="fill" />
      );
    default:
      break;
  }
};

export default RenderIcon;
