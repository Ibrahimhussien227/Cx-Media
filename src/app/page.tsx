"use client";
import { useLazyGetSellerProfileQuery } from '@/store/services/seller/profileApi';
import { selectCurrentUser } from '@/store/slices/user/userSlice';
import { ApplicationReviewStatus, KYCStatusEnum, SellerTypeEnum } from '@/types/enum.constants';
import { useUserToken } from '@/hooks/useUserToken';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const RootPage =()=> {
  const user = useSelector(selectCurrentUser) as IUserState;
  const router = useRouter();
  const [getSellerProfile, {data, error}] = useLazyGetSellerProfileQuery();

  const accessToken = useUserToken();

  useEffect(()=>{
    if (user){
      const isUserSetUpDone = (
        user.kycStatus === KYCStatusEnum.VERIFIED &&
        user.isRegistrationFeePaid &&
      (user.sellerType !== SellerTypeEnum.BUSINESS ? true // solo seller is set up
        : // check business critaria 
        user.applicationReviewStatus === ApplicationReviewStatus.APPROVED)
      );
  
      if (isUserSetUpDone) {
        router.replace("/campaigns")
      } else {
        router.replace("/account")
      }
    }
  }, [user, router])

  useEffect(()=> {
    if (accessToken && !data && !error){
      getSellerProfile()
    }
  }, [accessToken, data, error, getSellerProfile])



  return <div className='grid place-items-center h-20'>
    Checking Authorization...
  </div>
}


export default RootPage;