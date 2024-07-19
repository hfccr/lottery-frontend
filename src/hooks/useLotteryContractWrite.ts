import { useEffect, useState } from "react";
import { ethers, parseEther } from "ethers";
import Lottery from "@/contracts/Lottery.json";
import { lotteryContractAddress } from "@/contracts/deployment";
import { BrowserProvider } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

interface ContractWriteProps {
  methodName: string;
  methodParams: any[];
  amount: string;
}

const useLotteryContractWrite = () => {
  const { abi } = Lottery;
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [writeStatus, setWriteStatus] = useState({
    fetching: false,
    error: false,
    errorMessage: "",
    success: false,
    data: null,
  });
  useEffect(() => {
    const init = async () => {
      try {
        if (!isConnected || !walletProvider) throw Error("User disconnected");
        const ethersProvider = new BrowserProvider(walletProvider);
        setProvider(ethersProvider);
      } catch (err) {}
    };
    init();
  }, [address, chainId, isConnected]);

  const write = async ({
    methodName,
    methodParams,
    amount,
  }: ContractWriteProps) => {
    setWriteStatus({
      ...writeStatus,
      fetching: true,
    });
    try {
      if (!provider) {
        throw Error("Provider not available");
      }
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(lotteryContractAddress, abi, signer);
      let amountValue;
      if (amount !== "") {
        amountValue = parseEther(amount);
      }
      const tx = await contract[methodName](...methodParams, {
        value: amountValue,
      });
      await tx.wait();
      setWriteStatus({
        fetching: false,
        error: false,
        errorMessage: "",
        success: true,
        data: tx,
      });
    } catch (err) {
      console.log(err);
      setWriteStatus({
        fetching: false,
        error: true,
        errorMessage: (err as Error).message,
        success: false,
        data: null,
      });
    }
  };

  return { write, writeStatus };
};

export default useLotteryContractWrite;
