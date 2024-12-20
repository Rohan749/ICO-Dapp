import { MANAGER } from "@/constants/constants";
import React from "react";
import { useAccount } from "wagmi";

const ManagerConstraints = () => {

  const { address } = useAccount();

  
  return (
    <div className="text-center">
      {address === MANAGER ? (
        <>
          <h1>Please add Token balance and Token sale price.</h1>
        </>
      ) : (
        <>
          <h1>Currently in Progress!</h1>
          <h1>
            The manager needs to add some details. Thanks for your patience...
          </h1>
        </>
      )}
    </div>
  );
};

export default ManagerConstraints;
