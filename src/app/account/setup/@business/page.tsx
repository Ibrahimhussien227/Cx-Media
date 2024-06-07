"use client";
import { nanoid } from 'nanoid'
import { useCallback, useMemo, useState } from "react";
import { BusinessSellerTabOps, sellerTabStatusMap } from "../configs";
import ProgressTabs from "@/components/progressTabs";
import { ApplicationReview, CompanyInformation, FeePayment, PersonalIdentityVerification } from "../_comps";
import { useGetSellerProfileQuery } from "@/store/services/seller/profileApi";
import { useGetSellerCompanyDetailsQuery } from '@/store/services/seller/companyApi';


const BusinessSetupPage =()=>{

  const {data: sellerProfile, isLoading: isLoadingUser} = useGetSellerProfileQuery();
  const {data: companyData, isLoading: isLoadingCompany} = useGetSellerCompanyDetailsQuery(
    sellerProfile?.data.sellerId || nanoid(),
    {skip: !sellerProfile?.data}
  );
  
  let user = sellerProfile?.data;
  const apiCompanyDetails = companyData?.data instanceof Array? undefined : companyData?.data;

  if (apiCompanyDetails){
    user = {...user, companyDetails: apiCompanyDetails};
  }

  const [actionBtnConfig, setActionBtnConfig] = useState({text: 'save changes', disabled: true})

  const businessSellerTabs = useMemo(()=> !user? BusinessSellerTabOps : BusinessSellerTabOps.map(tab=> {
    const userTabChecker = sellerTabStatusMap[tab.value as keyof typeof sellerTabStatusMap];
    if (typeof userTabChecker === 'function'){
      return {
        ...tab,
        status: userTabChecker(user as ISellerProfile)
      }
    }
    return {
      ...tab,
      status: userTabChecker[user?.[tab.value as keyof typeof user] as keyof typeof userTabChecker]
    }})
  ,[user])

  const [activeTabIdx, setActiveTabIdx] = useState(0)

  const tabsSectionComps = {
    'companyDetails': CompanyInformation,
    'kycStatus': PersonalIdentityVerification,
    'applicationReviewStatus': ApplicationReview,
    'isRegistrationFeePaid': FeePayment
  };
  const activeTab = businessSellerTabs[activeTabIdx] as IProgressTabOption;

  const configActionBtn = useCallback((configParams:Partial<actionBtnConfig>)=>{
    setActionBtnConfig(prevconfigs=> {
      if (JSON.stringify(prevconfigs).includes(JSON.stringify(configParams))) return prevconfigs
      return {...prevconfigs, ...configParams}
    })
    
  }, [])

  const TabSectionComp = tabsSectionComps[activeTab.value as keyof typeof tabsSectionComps]

  return (
    <div className="mt-5">
      <ProgressTabs
        tabs={businessSellerTabs as IProgressTabOption[]}// we won't reach there unless there is a user
        onChange={(tabIdx)=> setActiveTabIdx(tabIdx)}
        value={activeTab}
        actionButton={activeTab.value === 'companyDetails'? actionBtnConfig:undefined}
      />
      {isLoadingUser || isLoadingCompany ? (
        <div>Loading...</div>
      ):(
        <div className="sm:px-4">
          {user && TabSectionComp && (
            <TabSectionComp
              user={user}
              activeTabState={{activeTabIdx, setActiveTabIdx}}
              configActionBtn={configActionBtn}
            />
          )}
        </div>
      )}
      
    </div>
  )
}

export default BusinessSetupPage;