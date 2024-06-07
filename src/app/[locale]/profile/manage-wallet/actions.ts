import { revalidateTag } from "next/cache";

export const revalidatePaymentMethods = async()=>{
  "use server";
  console.log("revalidating---------------payment-------------methods")
  revalidateTag('payment-methods')
}

export const revalidateWallet = async()=> {
  "use server";
  console.log("revalidating---------------Wallet")
  revalidateTag('wallet')
}

export const revalidateTransactions = async()=> {
  "use server";
  console.log("revalidating---------------Transactions")
  revalidateTag('transactions')
}