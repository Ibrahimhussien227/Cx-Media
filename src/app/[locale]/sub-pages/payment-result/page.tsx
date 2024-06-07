"use client";
import { useEffect } from "react";
import { checkPaymentStatus } from "./utils";
import { PaymentStatus } from "@/types/enum.constants";
import {WarningCircle, CheckCircle, XCircle} from '@/utils/icons';
import { useLazyAsync } from "@/hooks/useAsync";

const PaymentResultPage =()=>{
  const [checkPaymentResult, {isLoading, data}] = useLazyAsync(checkPaymentStatus);

  useEffect(()=> {
    window.parent.postMessage("get_order_ref", '*')
  }, [])

  useEffect(()=> {
    const receiveOrderRef =(evt : MessageEvent<string>)=>{
      if (typeof evt.data == 'string'){
        checkPaymentResult(evt.data)
      }
    }
    window.addEventListener('message', receiveOrderRef)
    return ()=> window.removeEventListener('message', receiveOrderRef)
  }, [checkPaymentResult])

  useEffect(()=> {
    if (data?.order){
      window.parent.postMessage(data.order.status.text, '*')
    }
  }, [data])

  return (
    <div className="p-2 mt-4 grid place-items-center">
      {isLoading ? (
        <p>Loading....</p>
      ):(
        <>
          {data?.order.status.text === PaymentStatus.Paid ? (
            <CheckCircle size={40} color="green"/>
          ): data?.order.status.text === PaymentStatus.Cancelled ? (
            <XCircle size={40} color="red"/>
          ): (
            <WarningCircle size={40} color="red" weight="duotone"/>
          )}
          {data?.order.status.text}
        </>
      )}
    </div>
  );
}


export default PaymentResultPage; 