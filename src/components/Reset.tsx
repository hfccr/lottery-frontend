"use client";
import useLotteryContractWrite from "@/hooks/useLotteryContractWrite";
import { Alert, Button, Skeleton } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export function Reset() {
  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success, error, errorMessage } = writeStatus;
  return (
    <>
      {!success && (
        <Button
          onClick={() => {
            write({
              methodName: "resetLottery",
              methodParams: [],
              amount: "",
            });
          }}
          isLoading={writing}
        >
          Reset
        </Button>
      )}{" "}
      {success === true && <Button isDisabled={true}>Contract Reset</Button>}{" "}
      {error && <Alert status="error">{errorMessage}</Alert>}{" "}
    </>
  );
}
