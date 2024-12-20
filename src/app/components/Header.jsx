import { PLATFORM_ABI, PLATFORM_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from '@/constants/constants'
import { useGetManager } from '@/hooks/useGetManager'
import { useGetTokenDetails } from '@/hooks/useGetTokenDetails'
import { addressReducer } from '@/utils/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { useAccount, useReadContract } from 'wagmi'

const Header = () => {

  const {managerAddress, isLoading, error} = useGetManager();



  return (
    <div className='flex items-center justify-between w-full'>
        <div className='font-bold manager'>
            <span>Manager: </span>
            {isLoading ?
            <span className='animate-pulse'>Loading...</span>
          :
          <span>{addressReducer(managerAddress)}</span>}
        </div>
        <div>
        <ConnectButton />
        </div>
    </div>
  )
}

export default Header