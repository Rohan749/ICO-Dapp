import { PLATFORM_ABI, PLATFORM_ADDRESS } from "../../constants/constants";
import { useBuyToken } from "../../hooks/useBuyToken";
import React, { useState } from "react";
import { useWriteContract } from "wagmi";

function BuyToken() {
  const [amount, setAmount] = useState("");
  const {onBuyToken} = useBuyToken()

  function handleBuyToken (e) {
    e.preventDefault();
    onBuyToken(amount)
    }

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div>
          <h1>BUY TOKEN</h1>
          <form className="flex flex-col gap-4">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Add amount"
            />
            <button
              onClick={handleBuyToken}
            >
              Buy token
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BuyToken;
