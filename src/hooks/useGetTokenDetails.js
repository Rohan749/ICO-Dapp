import { PLATFORM_ABI, PLATFORM_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants"
import { useAccount, useEnsName, useReadContract, useToken } from "wagmi"

export const useGetTokenDetails = () => {

    const {address:connectedAccount, isConnected} = useAccount();

    const {data, isLoading, error, refetch} = useReadContract({
        abi: PLATFORM_ABI,
        address: PLATFORM_ADDRESS,
        functionName: "getTokenDetails",
        overrides: {
            from: connectedAccount
        }
    })

    const {data:tokenUserAccount} = useReadContract({
        abi: PLATFORM_ABI,
        address: PLATFORM_ADDRESS,
        functionName: "getUserTokenBalance",
        args: [connectedAccount]
    })

    let tokenDetails

    if(data) {
        tokenDetails = {
            tokenName: data[0],
            tokenSymbol: data[1],
            contractTokenBalance: data[2],
            totalSupplyTokens: data[3],
            tokenPrice: data[4],
            tokenAddress: data[5],
            soldTokens: data[6],
            userTokenBalance: tokenUserAccount

        }
    }

    return {tokenDetails, isLoading, error, refetch}

}