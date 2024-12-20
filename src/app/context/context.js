
import { createContext, useState, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';  


const AccountContext = createContext(undefined);

export const AccountProvider = ({ children }) => {
  const { address, isConnected, disconnect } = useAccount();

  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    if (address && address !== currentAddress) {
      setCurrentAddress(address);
    }
  }, [address, currentAddress]);

  return (
    <AccountContext.Provider value={{ address: currentAddress, isConnected, disconnect }}>
      {children}
    </AccountContext.Provider>
  );
};

