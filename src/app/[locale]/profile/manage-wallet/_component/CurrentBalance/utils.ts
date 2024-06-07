

import Cookies from 'js-cookie';
import { useMemo } from 'react';

const baseUrl = `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}`;

interface IIntentReqBody {
  amount: number,
  currency: string,
  investorBankId: string,
  customerId: string,
} 

export const createPaymentIntent = async(body:IIntentReqBody) : Promise<{intentId: string, status: string}>=>{
  try {
    
    const resp = await fetch(`${baseUrl}/lean/payment/intent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.assign(body, {description: 'not in the design'}))
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch (err){
    console.error(err)
    throw err
  }
}


export const depositWithTelr = async(body: {amount: number, cardId: string})=>{
  try {
    
    const resp = await fetch(`${baseUrl}/telr/deposit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch (err){
    console.error(err)
    throw err
  }
}

export const useGetPaymentOps = (paymentMethods: IPaymentMethod[])=> {
  const methodsOptions = useMemo(()=> paymentMethods.map(method=> ({
    display: method.bankDetail? //bank account
      method.bankDetail.name + ' - ' + method.bankDetail.accountNumber.slice(-4) 
      ://else card
      !method.cardDetail? '': method.cardDetail.cardType + ' - ' + method.cardDetail.cardNumberLast4, 
    value: method.bankDetail? method.bankDetail.investorBankId : method.cardId
  })), [paymentMethods])
  return methodsOptions;
}
