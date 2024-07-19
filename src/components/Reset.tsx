"use client";
import React from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

export function Reset() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { write, writeStatus } = useLotteryContractWrite();
  const { fetching: writing, success, error, errorMessage } = writeStatus;
  return (
    <>
      {!success && (
        <Button onClick={onOpen} isLoading={writing} leftIcon={<RepeatIcon />}>
          Reset Lottery
        </Button>
      )}{" "}
      {success === true && <Button isDisabled={true}>Contract Reset</Button>}{" "}
      {error && <Alert status="error">{errorMessage}</Alert>}{" "}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset Lottery
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This contract call will erase all lottery state. The
              participants will not receive any of their funds back. This is
              only intended for testing and can be called by any user.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  write({
                    methodName: "resetLottery",
                    methodParams: [],
                    amount: "",
                  });
                  onClose();
                }}
                ml={3}
              >
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
