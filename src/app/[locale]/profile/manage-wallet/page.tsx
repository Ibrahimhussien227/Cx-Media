import TransactionHistory from "./_component/TransactionHistory";
import {
  createLeanCustomer,
  getLeanCustomer,
  getPaymentMethodsList,
  getWallet,
  getTransactionList,
} from "@/utils/api/PaymentApi";
import BankAccounts from "./_component/BankAccounts";
import {
  revalidatePaymentMethods,
  revalidateWallet,
  revalidateTransactions,
} from "./actions";
import CurrentBalance from "./_component/CurrentBalance";

// To DO: rendered on the client with optimistic updates 

const ManageWallet = async () => {
  let leanCustomer = await getLeanCustomer();
  if (leanCustomer?.[0]) {
    leanCustomer = leanCustomer[0] as ILeanCustomer;
  } else {
    leanCustomer = (await createLeanCustomer()) as ILeanCustomer;
  }

  const paymentMethods = await getPaymentMethodsList();

  const wallet = await getWallet();

  const transactions = await getTransactionList();

  return (
    <div className="flex flex-col w-full pl-[10px] lg:flex-row h-full">
      <div className="px-[10px] py-[10px] mr-[5px] lg:max-w-[30%]">
        {/* Currency Balance */}
        <CurrentBalance
          customerId={leanCustomer?.customerId}
          paymentMethods={paymentMethods}
          revalidatePaymentMethods={revalidatePaymentMethods}
          wallet={wallet}
          revalidateWallet={revalidateWallet}
          revalidateTransactions={revalidateTransactions}
        />

        {/* Linked Bank Accounts */}
        <BankAccounts
          customerId={leanCustomer?.customerId}
          paymentMethods={paymentMethods}
          revalidatePaymentMethods={revalidatePaymentMethods}
        />
      </div>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default ManageWallet;
