"use client";

import CustomButton from '@/components/CustomButton';
import {XCircle} from '@/utils/icons'
import { useEffect } from 'react';

const CardCancelledPage =()=>{
  
  useEffect(()=> {
    window.parent.postMessage("card-cancelled", '*')
  }, [])

  return (
    <div className="w-full p-2 mt-4 grid place-items-center content-center">
      <XCircle size={40} color="red"/>
      Operation Cancelled
      <CustomButton>
        
      </CustomButton>
    </div>
  );
}

export default CardCancelledPage;