import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const interval = 5000;

const useBlockNumber = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    const readBlockNumber = async () => {
      try {
        if (!isConnected || !walletProvider) throw Error("User disconnected");
        const ethersProvider = new BrowserProvider(walletProvider);
        const blockNumber = await ethersProvider.getBlockNumber();
        setBlockNumber(blockNumber);
      } catch (err) {
        setBlockNumber(0);
      }
    };
    readBlockNumber();
    const id = setInterval(readBlockNumber, interval);
    return () => clearInterval(id);
  }, [address, chainId, isConnected]);

  return blockNumber;
};

export default useBlockNumber;
