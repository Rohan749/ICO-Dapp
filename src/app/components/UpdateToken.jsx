import { useUpdateToken } from '../../hooks/useUpdateToken';
import React, { useState } from 'react'

const UpdateToken = () => {

  const [address, setAddress] = useState("");
  const {updateTokenAsync} = useUpdateToken()

  const handleUpdateAddress = (e) => {
    e.preventDefault();

    updateTokenAsync(address)
    
  }

  return (
    <div className='flex items-center justify-center h-full w-full'>
    <div>
    <h1>UPDATE TOKEN</h1>
    <form className='flex flex-col gap-4'>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Add token address'/>
        <button onClick={handleUpdateAddress}>Update token address</button>
    </form>
    </div>
</div>
  )
}

export default UpdateToken