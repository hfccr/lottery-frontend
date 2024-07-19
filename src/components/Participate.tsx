"use client";

import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import { Alert, Button, Skeleton } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

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
  let participationEnabled = false;
  let label = "";
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
  }
  return (
    <>
      Is already participating : {isAlreadyParticipating + ""}
      Current Participants : {participantCount + ""} / {maxParticipants + ""}
      {success && (
        <Button
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
          {label}
        </Button>
      )}{" "}
      {error && <Alert status="error">Failed to get participant data</Alert>}{" "}
      {fetching && !success && !error && <Skeleton height="20px" />}
    </>
  );
}
