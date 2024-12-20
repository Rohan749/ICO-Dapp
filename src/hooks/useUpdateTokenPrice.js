import { PLATFORM_ABI, PLATFORM_ADDRESS } from "../constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useUpdateTokenPrice = () => {
  const {
    data: hash,
    isPending,
    isError,
    writeContractAsync,
  } = useWriteContract();
    const {refetch} = useGetTokenDetails()

  const {
    data:txReceipt,
    isPending:isTxPending,
    isError:txError,
    isSuccess:txSuccess
  } = useWaitForTransactionReceipt({hash});

  useEffect(() => {
    if(txSuccess) {
      toast.success("Tokens price updated!")
      refetch()
    }
    else if(isError) {
      toast.error("User rejected the request!")
    }
  }, [isError, txSuccess])


  const updatePriceAsync = async (price) => {
    try {
        await writeContractAsync({
            abi: PLATFORM_ABI,
            address: PLATFORM_ADDRESS,
            functionName: "updateTokenSalePrice",
            args: [price]
        })
    } catch (error) {
        console.log("Error in updatePriceAsync function:", error)
    }
  }
  
  return {updatePriceAsync, txReceipt}


};
