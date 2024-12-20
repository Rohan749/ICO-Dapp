import { useUpdateTokenPrice } from '../../hooks/useUpdateTokenPrice';
import React, { useState } from 'react'

const UpdateTokenSalePrice = () => {

  const [price, setPrice] = useState();
  const {updatePriceAsync} = useUpdateTokenPrice()

  const handlePriceChange = (e) => {
    e.preventDefault();

    updatePriceAsync(price)
  }


  return (
    <div className='flex items-center justify-center h-full w-full'>
        <div>
        <h1>UPDATE TOKEN PRICE</h1>
        <form className='flex flex-col gap-4'>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Add amount'/>
            <button onClick={handlePriceChange}>Update token price</button>
        </form>
        </div>
    </div>
  )
}

export default UpdateTokenSalePrice