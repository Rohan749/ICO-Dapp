import { useTransferToManager } from "../../hooks/useTransferToManager";
import React, { useState } from "react";

const TransferToManager = () => {

  const [amount, setAmount] = useState();
  const {transferToManagerAsync} = useTransferToManager();

  const handleTransfer = (e) => {
    e.preventDefault();

    transferToManagerAsync(amount)

  }

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div>
          <h1>TRANSFER TO MANAGER</h1>
          <form className="flex flex-col gap-4">
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Add amount" />
            <button onClick={handleTransfer}>Buy token</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferToManager;
