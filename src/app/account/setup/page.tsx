"use client";
import ProgressTabs from "@/components/progressTabs";
import { useMemo, useState } from "react";
import { sellerTabStatusMap, soloSellerTabOps } from "./configs";
import { FeePayment, PersonalIdentityVerification } from "./_comps";
import { useGetSellerProfileQuery } from "@/store/services/seller/profileApi";


const SoloSetupPage =()=>{
  const {data: sellerProfile, isLoading: isLoadingUser} = useGetSellerProfileQuery();
  const user = sellerProfile?.data;

  const soloSellerTabs= useMemo(()=> !user? soloSellerTabOps : soloSellerTabOps.map(tab=> {
    const tabUserField = sellerTabStatusMap[tab.value as keyof typeof sellerTabStatusMap];
    return {
      ...tab,
      status: tabUserField[user[tab.value as keyof typeof user] as keyof typeof tabUserField]
    }})
  ,[user])

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  return isLoadingUser ? <div>loading..</div> : user && (
    <div className="mt-5">
      
      <ProgressTabs
        tabs={soloSellerTabs as IProgressTabOption[]}// we won't reach there unless there is a user
        onChange={(tabIdx)=> setActiveTabIdx(tabIdx)}
        value={soloSellerTabs[activeTabIdx] as IProgressTabOption}
      />
      <div className="sm:px-4">       
        {soloSellerTabs[activeTabIdx].value === 'kycStatus'? (
          <PersonalIdentityVerification
            user={user}
            activeTabState={{activeTabIdx, setActiveTabIdx}}  
          />         
        ):(
          <FeePayment user={user} activeTabState={{activeTabIdx, setActiveTabIdx}} /> 
        )}
      </div>
    </div>
  );
}

export default SoloSetupPage;