"use client";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import {
  Alert,
  Button,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";

export function ClaimPrize() {
  const { address } = useWeb3ModalAccount();
  const {
    success: isWinnerSuccess,
    error: isWinnerError,
    errorMessage: isWinnerErrorMessage,
    fetching: isWinnerFetching,
    data: isWinner,
  } = useLotteryContractRead({
    methodName: "isAddressWinner",
    methodParams: [address],
    watch: true,
  });
  const {
    success: getPrizeSuccess,
    error: getPrizeError,
    fetching: getPrizeFetching,
    data: prize,
  } = useLotteryContractRead({
    methodName: "getPrize",
    methodParams: [address],
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
  let prizeClaimEnabled = false;
  const readSuccess = isWinnerSuccess && getPrizeSuccess && lotteryOpenSuccess;
  const readFetching =
    isWinnerFetching || getPrizeFetching || lotteryOpenFetching;
  const readError = isWinnerError || getPrizeError || lotteryOpenError;
  console.log(prize);
  if (readSuccess) {
    if (
      lotteryOpen === false &&
      isWinner === true &&
      prize !== null &&
      prize !== BigInt(0)
    ) {
      label = "Claim " + ethers.formatEther(prize) + " ETH Prize";
      prizeClaimEnabled = true;
    } else if (
      lotteryOpen === false &&
      isWinner === true &&
      prize !== null &&
      prize === BigInt(0)
    ) {
      label = "Prize Claimed";
      prizeClaimEnabled = false;
    } else if (lotteryOpen === true) {
      label = "Lottery Not Drawn";
    } else if (lotteryOpen === false && isWinner === false) {
      label = "You Are Not A Winner";
      prizeClaimEnabled = false;
    }
  }

  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success: writeSuccess } = writeStatus;
  return (
    <Stat size="lg">
      <StatLabel>Claim Prize</StatLabel>
      <StatNumber>
        {readSuccess && (
          <Button
            marginTop={1}
            marginBottom={1}
            onClick={() => {
              write({
                methodName: "transferPrize",
                methodParams: [],
                amount: "",
              });
            }}
            isLoading={writing}
            isDisabled={!prizeClaimEnabled}
          >
            Claim Prize
          </Button>
        )}{" "}
        {readError && !readSuccess && !readFetching && (
          <Alert status="error">Failed to read prize data</Alert>
        )}{" "}
        {readFetching && <Skeleton height={50} />}
      </StatNumber>
      {readSuccess && <StatHelpText>{label}</StatHelpText>}
    </Stat>
  );
}
