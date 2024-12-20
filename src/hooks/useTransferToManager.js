import { PLATFORM_ABI, PLATFORM_ADDRESS } from "@/constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useTransferToManager = () => {
    const {
        data:hash,
        isError:isTransferError,
        isPending:isTransferPending,
        writeContractAsync
    } = useWriteContract();

      const {refetch} = useGetTokenDetails()

    const {
        data:txReceipt,
        isError:txError,
        isSuccess: txSuccess,
        isPending:isTxPending
    } = useWaitForTransactionReceipt({hash});

    useEffect(() => {
        console.log("TXSUCCESS:", txSuccess)
        if(txSuccess) {
          toast.success("Transfered to manager!")
          refetch()
        }
        else if(isTransferError) {
          toast.error("User rejected the request!")
        }
      }, [isTransferError, txSuccess])
    

    const transferToManagerAsync = async (amount) => {
        try {
            await writeContractAsync({
                abi: PLATFORM_ABI,
                address: PLATFORM_ADDRESS,
                functionName: "transferToManager",
                value: amount
            })
        } catch (error) {
            console.log("Error in TransferToManagerAsync", error)
        }
    }

    return {transferToManagerAsync, txReceipt}
}