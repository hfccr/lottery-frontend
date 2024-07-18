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
    data: participants,
  } = useLotteryContractRead({
    methodName: "getWinners",
    methodParams: [],
    watch: true,
  });
  // Add type annotation for participants
  let participantsArray: `0x{string}`[] = [];
  if (participants) {
    participantsArray = participants as `0x{string}`[];
  }
  return (
    <>
      {fetching && participants === null && <Skeleton height={400} />}
      {success && (
        <List spacing={4}>
          {Array.isArray(participantsArray) &&
            participantsArray.map((participant: `0x{string}`) => (
              <Addreth
                key={participant}
                address={participant}
                icon="identicon"
              />
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
