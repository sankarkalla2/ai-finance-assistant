import CanIAffordThis from "@/modules/tools/can-afford-this/ui/views/can-i-afford-this-view";
import { getUserForCanIafford } from "../actions/user";
import { Metadata } from "next";

// ...existing code...
export const metadata: Metadata = {
  title: "Can I Afford This",
  description:
    "Get a personalized recommendation on whether you should take a loan for your purchase, based on your income, expenses, and current financial commitments.",
};
// ...existing code...
const CanIAffordThisPage = async () => {
  const userInfo = await getUserForCanIafford();

  const data = {
    monthlyIncome: userInfo?.userInfo
      ? userInfo?.userInfo?.monthlyIncome + userInfo?.userInfo?.extraIncome
      : 0,
    monthlyExpenses: userInfo?.userInfo
      ? userInfo.userInfo.totalMonthlyExpenses
      : 0,
    totalPayableEMI: userInfo?.userInfo ? userInfo?.userInfo?.totalDebt : 0,
    monthlyPayableEMIs: userInfo?.userInfo
      ? userInfo.userInfo.monthlyDebtPayment
      : 0,
  };
  return <CanIAffordThis {...data} />;
};

export default CanIAffordThisPage;
