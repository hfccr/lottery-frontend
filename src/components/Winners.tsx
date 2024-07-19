"use client";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import {
  List,
  ListItem,
  Skeleton,
  Alert,
  Heading,
  VStack,
  Divider,
} from "@chakra-ui/react";
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
      {/* {fetching && winners === null && <Skeleton height={400} />} */}
      {success && Array.isArray(winnersArray) && winnersArray.length > 0 && (
        <VStack align="flex-start" spacing={2}>
          <Heading as="h5" size="md">
            Winners
          </Heading>
          <Divider />
          <List spacing={4}>
            {Array.isArray(winnersArray) &&
              winnersArray.map((winner: `0x{string}`) => (
                <div key={winner}>
                  <Addreth key={winner} address={winner} icon="identicon" />
                </div>
              ))}
            <ListItem></ListItem>
          </List>
        </VStack>
      )}
      {error && !fetching && !success && (
        <Alert status="error">{errorMessage}</Alert>
      )}
    </>
  );
}
