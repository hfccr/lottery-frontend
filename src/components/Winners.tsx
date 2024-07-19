"use client";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import { List, ListItem, ListIcon, Skeleton, Alert } from "@chakra-ui/react";
import { Addreth } from "addreth/no-wagmi";

export function Winners() {
  const {
    fetching,
    success,
    error,
    errorMessage,
    data: winners,
  } = useLotteryContractRead({
    methodName: "getWinners",
    methodParams: [],
    watch: true,
  });
  // Add type annotation for participants
  let winnersArray: `0x{string}`[] = [];
  if (winners) {
    winnersArray = winners as `0x{string}`[];
  }
  return (
    <>
      {fetching && winners === null && <Skeleton height={400} />}
      {success && (
        <List spacing={4}>
          {Array.isArray(winnersArray) &&
            winnersArray.map((winner: `0x{string}`) => (
              <Addreth key={winner} address={winner} icon="identicon" />
            ))}
          <ListItem></ListItem>
        </List>
      )}
      {error && !fetching && !success && (
        <Alert status="error">{errorMessage}</Alert>
      )}
    </>
  );
}
