"use client";

import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import { Alert, Button, Skeleton } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export function Participate() {
  const { address } = useWeb3ModalAccount();
  const {
    success,
    error,
    fetching,
    errorMessage,
    data: isAlreadyParticipating,
  } = useLotteryContractRead({
    methodName: "isAlreadyParticipating",
    methodParams: [address],
    watch: true,
  });
  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success: writeSuccess } = writeStatus;
  console.log("success");
  console.log(success);
  return (
    <>
      Is already participating : {isAlreadyParticipating + ""}
      {success && isAlreadyParticipating === false && (
        <Button
          onClick={() => {
            write({
              methodName: "enter",
              methodParams: [],
              amount: "0.000015",
            });
          }}
          isLoading={writing}
        >
          Participate
        </Button>
      )}{" "}
      {success && isAlreadyParticipating === true && (
        <Button isDisabled={true}>Participate</Button>
      )}{" "}
      {error && <Alert status="error">{errorMessage}</Alert>}{" "}
    </>
  );
}
