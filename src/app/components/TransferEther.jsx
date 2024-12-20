import React from 'react'

const TransferEther = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
        <div>
          <h1>TRANSFER TO DIFFERENT ACCOUNT</h1>
          <form className="flex flex-col gap-4">
            <input placeholder="Add address" />
            <input placeholder="Add amount" />
            <button>Buy token</button>
          </form>
        </div>
      </div>
  )
}

export default TransferEther