"use client";
import React, { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import {
  Container,
  Skeleton,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { isValidChain } from "@/context/Web3Modal";

export default function DappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const { chainId, isConnected } = useWeb3ModalAccount();
  const wrongChain = !isValidChain(chainId);
  const promptSwitch = isConnected && wrongChain;
  return (
    <Container maxW="3xl">
      {!isConnected && hydrated && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Connect Wallet</AlertTitle>
          Connect your wallet to continue
        </Alert>
      )}
      {promptSwitch && hydrated && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Invalid Network</AlertTitle>
          Switch network to continue
        </Alert>
      )}
      {!hydrated && (
        <Container maxW="md">
          <VStack spacing={0}>
            <Skeleton height={50} />
            <Skeleton height={400} />
          </VStack>
        </Container>
      )}
      {isConnected && !wrongChain && hydrated && <>{children}</>}
    </Container>
  );
}
