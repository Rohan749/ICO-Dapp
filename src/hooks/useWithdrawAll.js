import { PLATFORM_ABI, PLATFORM_ADDRESS } from "../constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useWithdrawAll = () => {
  const {
    data: hash,
    isPending,
    isError,
    writeContractAsync,
  } = useWriteContract();
    const {refetch} = useGetTokenDetails()

  const {
    data: txReceipt,
    isPending: isTxPending,
    isError: txError,
    isSuccess: txSuccess
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    console.log("TXSUCCESS:", txSuccess)
    if(txSuccess) {
      toast.success("Withdrawal successful!")
      refetch()
    }
    else if(isError) {
      toast.error("User rejected the request!")
    }
  }, [isError, txSuccess])


  const withdrawAllAsync = async () => {
    try {
        await writeContractAsync({
            abi: PLATFORM_ABI,
            address: PLATFORM_ADDRESS,
            functionName: "withdrawAllTokens"
        });

    } catch (error) {
        console.log("Error in withdrawAllAsync function:", error);
    }
  }

  return {withdrawAllAsync, txReceipt, isTxPending}
};
