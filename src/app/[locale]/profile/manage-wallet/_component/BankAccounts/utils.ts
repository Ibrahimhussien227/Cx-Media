
import { TelrSessionTypes } from '@/types/enum.constants';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}`;

export const createCardSession = async(host:string) : Promise<{order: {ref: string, url: string}}>=>{
  try {
    
    const resp = await fetch(`${baseUrl}/telr/create-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "callBackUrls": {
            "authorised": host + "/sub-pages/card-added",
            "declined": host + "/sub-pages/card-declined",
            "cancelled": host + "/sub-pages/card-cancelled"
         
        },
        "sessionType": TelrSessionTypes.AddCard
      })
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch (err){
    console.error(err)
    throw err
  }
}

export const setPreferedMethod = async(methodId:string) : Promise<boolean>=>{
  try {
    
    const resp = await fetch(`${baseUrl}/payment/method/primary/${methodId}`, {
      method: "PATCH",
      headers: {Authorization: `Bearer ${Cookies.get('accessToken')}`}
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch (err){
    console.error(err)
    throw err
  }
}

