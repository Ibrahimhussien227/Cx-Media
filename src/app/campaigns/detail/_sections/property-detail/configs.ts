import { completionStatus } from "@/types/enum.constants";

import {
  getAmentiesStatus,
  getDocumentsStatus,
  getFinancialStatus,
  getImagesStatus,
  getLocationStatus,
  getOverviewStatus
} from "../../utils";
import { AmenitiesForm, CommercialsForm, DocumentsForm, PropertyAddressForm, PropertyForm, PropertyImagesForm } from "../../_comps";


export const coompletionStatusColorMap = {
  [completionStatus.PENDING]: 'yellow',
  [completionStatus.INCOMPLETE]: 'blue',
  [completionStatus.COMPLETE]: 'green'
};


export const forms = [
  {
    id: 'property',
    title: 'Overview',
    Comp: PropertyForm,
    statusGetter: getOverviewStatus
  },
  {
    id: 'location',
    title: 'Location',
    Comp: PropertyAddressForm,
    statusGetter: getLocationStatus
  },
  {
    id: 'amenities',
    title: 'Amenities',
    Comp: AmenitiesForm,
    statusGetter: getAmentiesStatus
  },
  {
    id: 'images',
    title: 'Images',
    Comp: PropertyImagesForm,
    statusGetter: getImagesStatus
  },
  {
    id: 'docs',
    title: 'Documents',
    Comp: DocumentsForm,
    statusGetter: getDocumentsStatus
  },
  {
    id: 'financials',
    title: 'Commercials',
    Comp: CommercialsForm,
    statusGetter: getFinancialStatus
  }
];