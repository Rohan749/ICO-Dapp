"use client"


import { PLATFORM_ABI, PLATFORM_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "@/constants/constants"
import { useReadContract } from "wagmi"

export const useGetManager = () => {
    const {data:managerAddress, isLoading, error} = useReadContract({
        abi: PLATFORM_ABI,
        address: PLATFORM_ADDRESS,
        functionName: "manager"
    })

    return {managerAddress, isLoading, error}
}