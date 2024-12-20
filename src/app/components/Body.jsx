import { useGetTokenDetails } from "../../hooks/useGetTokenDetails";
import { addressReducer } from "../../utils/utils";
import { ethers } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from 'wagmi';


const Body = () => {

  const {tokenDetails,sender, isLoading, error, refetch} = useGetTokenDetails();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const soldTokens = Number(tokenDetails?.soldTokens);
    const totalTokens = Number(tokenDetails?.soldTokens) + Number(tokenDetails?.contractTokenBalance);

    const finalValue = (soldTokens/totalTokens)*100;

    setPercentage(finalValue)

  }, [tokenDetails])


  const {account, isConnected} = useAccount();

  return (
    <div className="lg:min-h-[60vh] w-full p-5 flex flex-col gap-10 items-center my-10 rounded-xl bg-custom font-bold">
      <h1>Hawk ICO-Token</h1>
      <div className="w-full lg:w-[30rem] container_box">
        <div>
          <span>Token name:</span>
          <span>{tokenDetails?.tokenName}</span>
        </div>
        <div>
          <span>Token symbol:</span>
          <span>{tokenDetails?.tokenSymbol}</span>
        </div>
        <div>
          <span>Token price:</span>
          <span>{tokenDetails?.tokenPrice}</span>
        </div>
        <div>
          <span>Token address:</span>
          <span>{addressReducer(tokenDetails?.tokenAddress)}</span>
        </div>
        <div>
          <span>User token balance:</span>
          <span>{tokenDetails?.userTokenBalance}</span>
        </div>
      </div>
      <div className="w-full">
     <div className="flex items-center justify-between w-full text-sm lg:text-lg">
        <div>Sold Tokens: {tokenDetails?.soldTokens}</div>
        <div>Tokens Left: {tokenDetails?.contractTokenBalance}</div>
     </div>
    <div className="w-full bg-gray-200 rounded-full h-4 ">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all "
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-center">{percentage.toFixed(2)}%</div>
      </div>

        <div className="text-sm lg:text-lg">
          <span>Total tokens in the contract:</span>
          <span>{tokenDetails?.soldTokens + tokenDetails?.contractTokenBalance}</span>
        </div>
    </div>
  );
};

export default Body;
