"use client";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import {
  List,
  ListItem,
  Skeleton,
  Alert,
  Heading,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { Addreth } from "addreth/no-wagmi";

export function Participants() {
  const {
    fetching,
    success,
    error,
    errorMessage,
    data: participants,
  } = useLotteryContractRead({
    methodName: "getParticipants",
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
      <VStack align="flex-start" spacing={2}>
        {/* {fetching && participants === null && <Skeleton height={400} />} */}
        {success && participantsArray.length > 0 && (
          <>
            <Heading as="h5" size="md">
              Players
            </Heading>
            <Divider />
            <List spacing={4}>
              {Array.isArray(participantsArray) &&
                participantsArray.map((participant: `0x{string}`) => (
                  <div key={participant}>
                    <Addreth
                      key={participant}
                      address={participant}
                      icon="identicon"
                    />
                  </div>
                ))}
              <ListItem></ListItem>
            </List>
          </>
        )}
        {error && !fetching && !success && (
          <Alert status="error">{errorMessage}</Alert>
        )}
      </VStack>
    </>
  );
}
