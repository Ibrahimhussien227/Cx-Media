"use client";

import { useCheckPaymentStatusMutation } from "@/store/services/payment/api";
import { PaymentStatus } from "@/types/enum.constants";
import { useEffect } from "react";
import {WarningCircle, CheckCircle, XCircle} from '@/utils/icons';

const PaymentResultPage =()=>{
  const [checkPaymentStatus, {isLoading, data}] = useCheckPaymentStatusMutation();

  useEffect(()=> {
    window.parent.postMessage("get_order_ref", '*')
  }, [])

  useEffect(()=> {
    const receiveOrderRef =(evt : MessageEvent<string>)=>{
      if (typeof evt.data == 'string'){
        checkPaymentStatus(evt.data)
      }
    }
    window.addEventListener('message', receiveOrderRef)
    return ()=> window.removeEventListener('message', receiveOrderRef)
  }, [checkPaymentStatus])

  useEffect(()=> {
    if (data?.data){
      window.parent.postMessage(data.data.order.status.text, '*')
    }
  }, [data])

  return (
    <div className="p-2 mt-4 grid place-items-center">
      {isLoading ? (
        <p>Loading....</p>
      ):(
        <>
          {data?.data.order.status.text === PaymentStatus.Paid ? (
            <CheckCircle size={40} color="green"/>
          ): data?.data.order.status.text === PaymentStatus.Cancelled ? (
            <XCircle size={40} color="red"/>
          ): (
            <WarningCircle size={40} color="red" weight="duotone"/>
          )}
          {data?.data.order.status.text}
        </>
      )}
    </div>
  );
}


export default PaymentResultPage; 