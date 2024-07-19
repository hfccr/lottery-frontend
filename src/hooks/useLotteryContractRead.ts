import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";
import Lottery from "@/contracts/Lottery.json";
import Deployments from "@/contracts/deployedAddresses.json";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import useBlockNumber from "./useBlockNumber";

const interval = 5000;

interface UseLotteryContractReadProps {
  methodName: string;
  methodParams: any[];
  watch: boolean;
}

const useLotteryContractRead = ({
  methodName,
  methodParams = [],
  watch = false,
}: UseLotteryContractReadProps) => {
  const { Lottery: lotteryContractAddress } = Deployments;
  const { abi } = Lottery;
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const blockNumber = useBlockNumber();
  const [read, setRead] = useState({
    fetching: false,
    error: false,
    errorMessage: "",
    success: false,
    data: null,
  });

  useEffect(() => {
    const readLottery = async () => {
      setRead((read) => ({
        ...read,
        fetching: true,
      }));
      try {
        if (!isConnected || !walletProvider) throw Error("User disconnected");
        const ethersProvider = new BrowserProvider(walletProvider);
        const contract = new ethers.Contract(
          lotteryContractAddress,
          abi,
          ethersProvider
        );
        const contractRead = await contract[methodName](...methodParams);
        setRead({
          fetching: false,
          error: false,
          errorMessage: "",
          success: true,
          data: contractRead,
        });
      } catch (err) {
        setRead({
          fetching: false,
          error: true,
          errorMessage: (err as Error).message,
          success: false,
          data: null,
        });
      }
    };
    readLottery();
  }, [address, chainId, isConnected, blockNumber]);

  return read;
};

export default useLotteryContractRead;
