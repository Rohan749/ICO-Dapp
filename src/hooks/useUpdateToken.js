import { PLATFORM_ABI, PLATFORM_ADDRESS } from "../constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useUpdateToken = () => {
  const {
    data: hash,
    isPending,
    isError,
    writeContractAsync
  } = useWriteContract();
    const {refetch} = useGetTokenDetails()

  const {
    data: txReceipt,
    isPending:isTxPending,
    isError:txError,
    isSuccess: txSuccess
  } = useWaitForTransactionReceipt({hash});

  useEffect(() => {
    if(txSuccess) {
      toast.success("Tokens address updated!")
      refetch()
    }
    else if(isError) {
      toast.error("User rejected the request!")
    }
  }, [isError, txSuccess])


  const updateTokenAsync = async (address) => {
    try {
        await writeContractAsync({
            abi: PLATFORM_ABI,
            address: PLATFORM_ADDRESS,
            functionName: "updateToken",
            args: [address]
        })
    } catch (error) {
        console.log("Error in updateTokenAsync function:", error);
    }
  }

  return {updateTokenAsync, txReceipt, isTxPending}
};
