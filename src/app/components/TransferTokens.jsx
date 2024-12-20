import { useTokenTransfer } from '../../hooks/useTokenTransfer';
import { useUpdateToken } from '../../hooks/useUpdateToken';
import React, { useState } from 'react'

const TransferTokens = () => {

  const [address, setAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("")
  const {tokenTransferAsync} = useTokenTransfer()

  const handleTokenTransfer = (e) => {
      e.preventDefault();

      tokenTransferAsync(address, tokenAmount);

  }

  return (
    <div className='flex items-center justify-center h-full w-full'>
    <div>
    <h1>TRANSFER TOKEN</h1>
    <form className='flex flex-col gap-4'>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Add contract address'/>
        <input value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} placeholder='Add token amount'/>
        <button onClick={handleTokenTransfer}>Transfer Token To Platform</button>
    </form>
    </div>
</div>
  )
}

export default TransferTokens