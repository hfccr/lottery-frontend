"use client";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import { Alert, Button, Skeleton } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export function CloseLottery() {
  const { address } = useWeb3ModalAccount();
  const {
    success: participantCountSuccess,
    error: participantCountError,
    errorMessage: participantCountErrorMessage,
    fetching: participantCountFetching,
    data: participantCount,
  } = useLotteryContractRead({
    methodName: "participantCount",
    methodParams: [],
    watch: true,
  });
  const {
    success: minParticipantsSuccess,
    error: minParticipantsError,
    fetching: minParticipantsFetching,
    data: minParticipants,
  } = useLotteryContractRead({
    methodName: "minParticipants",
    methodParams: [],
    watch: true,
  });
  const {
    success: lotteryOpenSuccess,
    error: lotteryOpenError,
    fetching: lotteryOpenFetching,
    data: lotteryOpen,
  } = useLotteryContractRead({
    methodName: "lotteryOpen",
    methodParams: [],
    watch: true,
  });
  let label;
  let lotteryCloseEnabled = false;
  const readSuccess =
    lotteryOpenSuccess && minParticipantsSuccess && participantCountSuccess;
  const readFetching =
    lotteryOpenFetching || minParticipantsFetching || participantCountFetching;
  const readError =
    lotteryOpenError || minParticipantsError || participantCountError;
  if (readSuccess) {
    if (
      lotteryOpen === true &&
      participantCount !== null &&
      minParticipants !== null &&
      participantCount >= minParticipants
    ) {
      label = "Draw Lottery";
      lotteryCloseEnabled = true;
    } else if (lotteryOpen === false) {
      label = "Lottery Drawn";
    } else if (
      lotteryOpen === true &&
      participantCount !== null &&
      minParticipants !== null &&
      participantCount < minParticipants
    ) {
      label =
        minParticipants -
        participantCount +
        " More Participants Needed To Draw";
      lotteryCloseEnabled = false;
    }
  }

  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success: writeSuccess } = writeStatus;
  return (
    <>
      {readSuccess && (
        <Button
          onClick={() => {
            console.log("Writing end lottery");
            write({
              methodName: "endLottery",
              methodParams: [],
              amount: "",
            });
          }}
          isLoading={writing}
          isDisabled={!lotteryCloseEnabled}
        >
          {label}
        </Button>
      )}{" "}
      {readError && !readSuccess && !readFetching && (
        <Alert status="error">Failed to read participant data</Alert>
      )}{" "}
      {readFetching && <Skeleton height={50} />}
    </>
  );
}
