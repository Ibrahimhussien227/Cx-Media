import { cookies } from 'next/headers'
const baseUrl = `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}`;

const getHeaders =()=>{
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value;

  return ({
    Authorization: `Bearer ${accessToken}`,
  })
}


export const getLeanCustomer = async () => {
  try {
    const resp = await fetch(`${baseUrl}/lean`, {
      next: { revalidate: 1707901586 },
      method: "GET",
      headers: getHeaders(),
    });
  
    const data = await resp.json();
    
    if (data.error) throw data

    return data.data;
  } catch(err){
    console.error(err)
  }
};

export const createLeanCustomer = async() => {
  try {
    const resp = await fetch(`${baseUrl}/lean/customer`, {
      next: { revalidate: 1707901586 },
      method: "POST",
      headers: getHeaders(),
    });

    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch(err){
    console.error(err)
  }
}

export const getPaymentMethodsList = async() : Promise<IPaymentMethod[]> => {
  try {
    const resp = await fetch(`${baseUrl}/payment/method/list`, {
      next: { revalidate:  120, tags: ['payment-methods']},
      method: "GET",
      headers: getHeaders()
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data;
  } catch (err){
    console.error(err)
    return []
  }
}

export const getWallet = async() : Promise<IWallet | undefined> => {
  try {
    const resp = await fetch(`${baseUrl}/wallet`, {
      next: { revalidate:  120, tags: ['wallet']},
      method: "GET",
      headers: getHeaders()
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data instanceof Array? undefined : data.data; // array === no wallet
  } catch (err){
    console.error(err)
  }
}


export const getTransactionList = async() : Promise<ITransaction[]>=> {
  try {
    const resp = await fetch(`${baseUrl}/transaction/list`, {
      next: { revalidate:  120, tags: ['transactions']},
      method: "GET",
      headers: getHeaders()
    });
    const data = await resp.json();
    
    if (data.error) throw data
    
    return data.data
  } catch (err){
    console.error(err)
    return [];
  }
}