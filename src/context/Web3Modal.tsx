"use client";
import { ReactNode } from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// Your WalletConnect Cloud project ID
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const env = process.env.NODE_ENV;

// 2. Set chains
const sepolia = {
  chainId: 11155111,
  name: "Sepolia test network",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.drpc.org	",
};

const hardhat = {
  chainId: 31337,
  name: "Hardhat",
  currency: "ETH",
  explorerUrl: "",
  rpcUrl: "http://127.0.0.1:8545/",
};

// 3. Create a metadata object
const metadata = {
  name: "lottery",
  description: "Lottery dApp",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

const chains = env === "development" ? [hardhat] : [sepolia];

export const isValidChain = (chainId: number | undefined) => {
  return chains.some((chain) => chain.chainId === chainId);
};

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: "light",
});

export function Web3Modal({ children }: { children: ReactNode }) {
  return children;
}
