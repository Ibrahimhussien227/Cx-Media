import { AmenitiesForm, CommercialsForm, DocumentsForm, PropertyAddressForm, PropertyForm, PropertyImagesForm } from "../../_comps";



export const forms = [
  {
    id: 'property',
    title: 'Overview',
    Comp: PropertyForm,
  },
  {
    id: 'location',
    title: 'Location',
    Comp: PropertyAddressForm,
  },
  {
    id: 'amenities',
    title: 'Amenities',
    Comp: AmenitiesForm,
  },
  {
    id: 'images',
    title: 'Images',
    Comp: PropertyImagesForm,
  },
  {
    id: 'docs',
    title: 'Documents',
    Comp: DocumentsForm,
  },
  {
    id: 'financials',
    title: 'Commercials',
    Comp: CommercialsForm,
  }
];