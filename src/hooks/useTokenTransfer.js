import { TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useTokenTransfer = () => {
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
    isSuccess: txSuccess,
    isError: txError,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if(txSuccess) {
      toast.success("Tokens transfered!")
      refetch();
    }
    else if(isError) {
      toast.error("User rejected the request!")
    }
  }, [isError, txSuccess])


  const tokenTransferAsync = async (address, tokenAmount) => {
    try {
        await writeContractAsync({
            abi: TOKEN_ABI,
            address: TOKEN_ADDRESS,
            functionName: "transfer",
            args: [address, tokenAmount]
        })
    } catch (error) {
        console.log("Error in tokenTransferAsync function:", error)
    }
  }

  return {tokenTransferAsync, txReceipt}
};
