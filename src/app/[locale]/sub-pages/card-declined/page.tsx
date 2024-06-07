"use client";

import {XCircle} from '@/utils/icons'
import { useEffect } from 'react';

const CardDeclinedPage =()=>{
  
  useEffect(()=> {
    window.parent.postMessage("card-declined", '*')
  }, [])

  return (
    <div className="w-full p-2 mt-4 grid place-items-center content-center">
      <XCircle size={40} color="red"/>
       We are sorry, seems like your card got declined.. try again later
    </div>
  );
}

export default CardDeclinedPage;