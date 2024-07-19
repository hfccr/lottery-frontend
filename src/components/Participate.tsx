"use client";

import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import {
  Alert,
  Box,
  Button,
  Card,
  CardBody,
  Skeleton,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { CloseLottery } from "./CloseLottery";
import { ClaimPrize } from "./ClaimPrize";

export function Participate() {
  const { address } = useWeb3ModalAccount();
  const {
    success: isAlreadyParticipatingSuccess,
    error: isAlreadyParticipatingError,
    fetching: isAlreadyParticipatingFetching,
    data: isAlreadyParticipating,
  } = useLotteryContractRead({
    methodName: "isAlreadyParticipating",
    methodParams: [address],
    watch: true,
  });
  const {
    success: participantCountSuccess,
    data: participantCount,
    error: participantCountError,
    fetching: participantCountFetching,
  } = useLotteryContractRead({
    methodName: "participantCount",
    methodParams: [],
    watch: true,
  });
  const {
    success: maxParticipantsSuccess,
    data: maxParticipants,
    error: maxParticipantsError,
    fetching: maxParticipantsFetching,
  } = useLotteryContractRead({
    methodName: "maxParticipants",
    methodParams: [],
    watch: true,
  });
  const {
    success: lotteryOpenSuccess,
    data: lotteryOpen,
    error: lotteryOpenError,
    fetching: lotteryOpenFetching,
  } = useLotteryContractRead({
    methodName: "lotteryOpen",
    methodParams: [],
    watch: true,
  });
  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success: writeSuccess } = writeStatus;
  const success =
    isAlreadyParticipatingSuccess &&
    participantCountSuccess &&
    maxParticipantsSuccess &&
    lotteryOpenSuccess;
  const error =
    isAlreadyParticipatingError ||
    participantCountError ||
    maxParticipantsError ||
    lotteryOpenError;
  const fetching =
    isAlreadyParticipatingFetching ||
    participantCountFetching ||
    maxParticipantsFetching ||
    lotteryOpenFetching;
  let participationEnabled = true;
  let label = "0.000015 ETH Required";
  let participantHelperText;
  if (success && participantCount !== null && maxParticipants !== null) {
    if (!lotteryOpen) {
      participationEnabled = false;
      label = "Lottery Drawn";
    } else if (isAlreadyParticipating) {
      participationEnabled = false;
      label = "Already Participating";
    } else if (participantCount >= maxParticipants) {
      participationEnabled = false;
      label = "Max Participants Reached";
    }
    participantHelperText = lotteryOpen
      ? participantCount + "/" + maxParticipants + " Participants"
      : "No Prizes";
  }
  return (
    <>
      {success && (
        <Card variant="outlined" width="100%" marginTop={2} marginBottom={2}>
          <CardBody>
            <StatGroup width="100%">
              <Stat size="lg">
                <StatLabel>
                  {lotteryOpen ? "Participants" : "Players"}
                </StatLabel>
                <StatNumber fontSize="xx-large">
                  {"" + participantCount}
                </StatNumber>
                <StatHelpText>{participantHelperText}</StatHelpText>
              </Stat>
              {lotteryOpen && (
                <Stat size="lg">
                  <StatLabel>Play</StatLabel>
                  <StatNumber>
                    <Button
                      marginTop={1}
                      marginBottom={1}
                      onClick={() => {
                        write({
                          methodName: "enter",
                          methodParams: [],
                          amount: "0.000015",
                        });
                      }}
                      isDisabled={!participationEnabled}
                      isLoading={writing}
                    >
                      Participate
                    </Button>
                  </StatNumber>
                  <StatHelpText>{label}</StatHelpText>
                </Stat>
              )}
              {!lotteryOpen && (
                <Stat size="lg">
                  <StatLabel>Winners</StatLabel>
                  <StatNumber fontSize="xx-large">2</StatNumber>
                  <StatHelpText>Won Prizes</StatHelpText>
                </Stat>
              )}
              {lotteryOpen && <CloseLottery />}
              {!lotteryOpen && <ClaimPrize />}
            </StatGroup>
          </CardBody>
        </Card>
      )}{" "}
      {error && <Alert status="error">Failed to get participant data</Alert>}{" "}
      {fetching && !success && !error && <Skeleton height="20px" />}
    </>
  );
}
