"use client";
import { Tabs, rem } from "@mantine/core";
import { useState } from "react";
import BuyToken from "./BuyToken";
import TransferToManager from "./TransferToManager";
import TransferEther from "./TransferEther";
import UpdateToken from "./UpdateToken";
import UpdateTokenSalePrice from "./UpdateTokenSalePrice";
import { useWithdrawAll } from "../../hooks/useWithdrawAll";
import TransferTokens from "./TransferTokens";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MANAGER } from "../../constants/constants";
import { useGetTokenDetails } from "../../hooks/useGetTokenDetails";
import ManagerConstraints from "./ManagerConstraints";

function Functions() {
  const [tabs, setTabs] = useState(0);
  const [managerTabs, setManagerTabs] = useState(0);
  const { withdrawAllAsync } = useWithdrawAll();
  const { address, isConnected } = useAccount();
  const { tokenDetails } = useGetTokenDetails();

  const handleWithdrawAll = () => {
    withdrawAllAsync();
  };

  return (
    <>
      {isConnected ? (
        <>
          {!tokenDetails?.tokenAddress || !tokenDetails?.tokenPrice ? (
            <ManagerConstraints />
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <button onClick={() => setTabs(0)}>Buy Token</button>
                <button onClick={() => setTabs(1)}>Transfer to manager</button>
                <button onClick={() => setTabs(2)}>Transfer Ether</button>
              </div>
              <div className=" h-[25rem] w-full">
                {tabs === 0 && <BuyToken />}
                {tabs === 1 && <TransferToManager />}
                {tabs === 2 && <TransferEther />}
              </div>
            </>
          )}
          {address === MANAGER && (
            <>
              <h1 className="pt-[3rem]">Access to Manager</h1>
              <div className="flex items-center justify-between gap-4">
                <button onClick={handleWithdrawAll}>Withdraw all tokens</button>
                <button onClick={() => setManagerTabs(0)}>Update token</button>
                <button onClick={() => setManagerTabs(1)}>
                  Update selling price
                </button>
                <button onClick={() => setManagerTabs(2)}>
                  Transfer Tokens To Contract
                </button>
              </div>
              <div className=" h-[25rem] w-full">
                {/* {managerTabs === 5 && <>MANAGER TOKEN BALANCE</>} */}
                {managerTabs === 0 && <UpdateToken />}
                {managerTabs === 1 && <UpdateTokenSalePrice />}
                {managerTabs === 2 && <TransferTokens />}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="py-4">CONNECT YOUR WALLET TO GAIN FURTHER ACCESS</h1>
          <ConnectButton />
        </>
      )}
    </>
  );
}

export default Functions;
