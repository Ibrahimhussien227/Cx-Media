"use client";

import {CheckCircle} from '@/utils/icons'
import { useEffect } from 'react';

const CardAddedPage =()=>{
  
  useEffect(()=> {
    window.parent.postMessage("card-added", '*')
  }, [])

  return (
    <div className="w-full p-2 mt-4 grid place-items-center content-center">
      <CheckCircle size={40} color="green"/>
      Card Data Added successfully
    </div>
  );
}

export default CardAddedPage;