import { RTKSellerTrigger } from "../../@business/types";
import { convertObjToFormData } from "@/utils/convertObjToFormData";
import { SellerTypeEnum } from "@/types/enum.constants";

//TODO enable save changes button only when all required fields are filled

export const companyInfoReducer : React.Reducer<
  {
    details: {
      companyName?: string;
      companyAddress_1?: string;
      companyAddress_2?: string;
      postalCode?: number;
      city?: string;
      country?: string;
      companyTaxId?: string;
      numOfEmployees?: number;
      fullLegalName?: string;
      jobProfile?: string;
      officialEmail?: string;
      officialPhoneNumber?: string;
      countryCode?: string;
      tradeLicenseFile?: IAssetMediaFiles | File | null;
      taxCertificateFile?: IAssetMediaFiles | File | null;
      employmentProofFile?: IAssetMediaFiles | File | null;
    };
    apiCompanyDetails: ICompanyDetails;
    actionBtnConfig: Partial<actionBtnConfig>,
    createSellerCompany: RTKSellerTrigger<FormData, IGenericResponse>;
    updateSellerCompany: RTKSellerTrigger<FormData, IGenericResponse>;
    changedFields: {
      [fieldName: string]: boolean;// true == changed 
    },
  },
  {type: string, payload: number | string | File | null}
> =(state, action)=> {
  let newCompanyInfoFormState = state;
  let hasFieldChanged = false;

  switch (action.type){
    case 'SET_COMPANY_NAME':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyName;
      newCompanyInfoFormState = {...state,
        details: {...state.details, companyName: action.payload as string},
        changedFields: {...state.changedFields, companyName: hasFieldChanged}
      }
      break;
    case 'SET_COMPANY_ADDRESS1':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyAddress_1;
      newCompanyInfoFormState = {...state,
        details: {...state.details, companyAddress_1: action.payload as string},
        changedFields: {...state.changedFields, companyAddress_1: hasFieldChanged}
      }
      break;
    case 'SET_COMPANY_ADDRESS2':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyAddress_2;
      newCompanyInfoFormState = {...state,
        details: {...state.details, companyAddress_2: action.payload as string},
        changedFields: {...state.changedFields, companyAddress_2: hasFieldChanged}
      }
      break;
    case 'SET_COUNTRY':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.country;
      newCompanyInfoFormState = {...state,
        details: {...state.details, country: action.payload as string},
        changedFields: {...state.changedFields, country: hasFieldChanged}
      }
      break;
    case 'SET_CITY':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.city;
      newCompanyInfoFormState = {...state,
        details: {...state.details, city: action.payload as string},
        changedFields: {...state.changedFields, city: hasFieldChanged}
      }
      break;
    case 'SET_POSTAL_CODE':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.postalCode;
      newCompanyInfoFormState = {...state,
        details: {...state.details, postalCode: action.payload as number},
        changedFields: {...state.changedFields, postalCode: hasFieldChanged}
      }
      break;
    case 'SET_TAX_ID':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyTaxId;
      newCompanyInfoFormState = {...state,
        details: {...state.details, companyTaxId: action.payload as string},
        changedFields: {...state.changedFields, companyTaxId: hasFieldChanged}
      }
      break;
    case 'SET_EMPLOYEE_COUNT':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.numOfEmployees;
      newCompanyInfoFormState = {...state,
        details: {...state.details, numOfEmployees: action.payload as number},
        changedFields: {...state.changedFields, numOfEmployees: hasFieldChanged}
      }
      break;
    case 'SET_REP_NAME':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyRepresentativeDetails?.fullLegalName;
      newCompanyInfoFormState = {...state,
        details: {...state.details, fullLegalName: action.payload as string},
        changedFields: {...state.changedFields, fullLegalName: hasFieldChanged}
      }
      break;
    case 'SET_REP_ROLE':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyRepresentativeDetails?.jobProfile;
      newCompanyInfoFormState = {...state,
        details: {...state.details, jobProfile: action.payload as string},
        changedFields: {...state.changedFields, jobProfile: hasFieldChanged}
      }
      break;
    case 'SET_PHONE_NUM':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyRepresentativeDetails?.officialPhoneNumber;
      newCompanyInfoFormState = {...state,
        details: {...state.details, officialPhoneNumber: action.payload as string},
        changedFields: {...state.changedFields, officialPhoneNumber: hasFieldChanged}
      }
      break;
    case 'SET_COUNTRY_CODE':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyRepresentativeDetails?.countryCode;
      newCompanyInfoFormState = {...state,
        details: {...state.details, countryCode: action.payload as string},
        changedFields: {...state.changedFields, countryCode: hasFieldChanged}
      }
      break;
    case 'SET_REP_EMAIL':
      hasFieldChanged = action.payload !== state.apiCompanyDetails?.companyRepresentativeDetails?.officialEmail;
      newCompanyInfoFormState = {...state,
        details: {...state.details, officialEmail: action.payload as string},
        changedFields: {...state.changedFields, officialEmail: hasFieldChanged}
      }
      break;
    case 'SET_LICENSE':
      hasFieldChanged = action.payload instanceof File || (state.apiCompanyDetails.isRegistrationLicenseUploaded || false) && (action.payload === null);
      newCompanyInfoFormState = {...state,
        details: {...state.details, tradeLicenseFile: action.payload as File | null},
        changedFields: {...state.changedFields, tradeLicenseFile: hasFieldChanged}
      }
      break;
    case 'SET_TAX_CERTIFICATE':
      hasFieldChanged = action.payload instanceof File || (state.apiCompanyDetails.isTaxCertificateUploaded || false) && (action.payload === null);
      newCompanyInfoFormState = {...state,
        details: {...state.details, taxCertificateFile: action.payload as File | null},
        changedFields: {...state.changedFields, taxCertificateFile: hasFieldChanged}
      }
      break;
    case 'SET_EMPLOYEMENT_PROOF':
      hasFieldChanged = action.payload instanceof File || (state.apiCompanyDetails.companyRepresentativeDetails?.isEmploymentProofUploaded || false) && (action.payload === null);
      newCompanyInfoFormState = {...state,
        details: {...state.details, employmentProofFile: action.payload as File | null},
        changedFields: {...state.changedFields, employmentProofFile: hasFieldChanged}
      }
      break;
  }
  if (hasFieldChanged){
    newCompanyInfoFormState.actionBtnConfig = {
      disabled: false,
      onClick: ()=> {
        if (state.apiCompanyDetails.sellerId === undefined){ // post request, as no company details object are created yet
          state.createSellerCompany(
            convertObjToFormData({
              ...newCompanyInfoFormState.details,
            })
          )
        } else { // patch request
          state.updateSellerCompany(
            convertObjToFormData({
              companyId: state.apiCompanyDetails.companyId, 
              ...newCompanyInfoFormState.details,
            })
          )
        }
      }
    }
  } else if (!state.actionBtnConfig.disabled && Object.values(state.changedFields).every(field=> field === false)){ // no field changed
    newCompanyInfoFormState.actionBtnConfig = {disabled: true}
  }

  return newCompanyInfoFormState;
}