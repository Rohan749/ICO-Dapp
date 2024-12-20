"use client"

import { PLATFORM_ABI, PLATFORM_ADDRESS } from "../constants/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { writeContract } from "viem/actions";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useGetTokenDetails } from "./useGetTokenDetails";

export const useBuyToken = () => {
  const {
    data: hash,
    isSuccess: buySuccess,
    error: buyError,
    isPending: isBuyPending,
    writeContractAsync,
  } = useWriteContract();

  const {refetch, refetchUserBalance} = useGetTokenDetails()

  const {
    isPending:isTxPending,
    error:txError,
    isSuccess:txSuccess,
    data: txHash,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if(txSuccess) {
      toast.success("Tokens buyed!")
      refetch();
      refetchUserBalance();
    }
    else if(buyError) {
      toast.error("User rejected the request!")
    }
  }, [buyError, buySuccess, txSuccess])

  const onBuyToken = async (amount) => {
   try {
      await writeContractAsync({
         abi: PLATFORM_ABI,
         address: PLATFORM_ADDRESS,
         functionName: "buyToken",
         value: amount
      })
   } catch (error) {
      console.log("Error in onBuyToken function:", error);
   }
  }

  return {onBuyToken, txError, txSuccess, txHash }
};
