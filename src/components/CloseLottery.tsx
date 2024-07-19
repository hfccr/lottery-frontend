"use client";
import React from "react";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import {
  Alert,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
} from "@chakra-ui/react";

export function CloseLottery() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const {
    success: participantCountSuccess,
    error: participantCountError,
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
      label = minParticipants - participantCount + " More Participants Needed";
      lotteryCloseEnabled = false;
    }
  }

  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success: writeSuccess } = writeStatus;
  return (
    <Stat size="lg">
      <StatLabel>Draw Lottery</StatLabel>
      <StatNumber>
        {readSuccess && (
          <Button
            marginTop={1}
            marginBottom={1}
            onClick={onOpen}
            isLoading={writing}
            isDisabled={!lotteryCloseEnabled}
          >
            Draw Lottery
          </Button>
        )}{" "}
        {readError && !readSuccess && !readFetching && (
          <Alert status="error">No Data</Alert>
        )}{" "}
      </StatNumber>
      {readSuccess && <StatHelpText>{label}</StatHelpText>}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Draw Lottery
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This contract call will draw the lottery and select
              winners randomly from the participants. This can be called by any
              user.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  write({
                    methodName: "endLottery",
                    methodParams: [],
                    amount: "",
                  });
                  onClose();
                }}
                ml={3}
              >
                Draw Lottery
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stat>
  );
}
