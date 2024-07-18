"use client";

import { CloseLottery } from "@/components/CloseLottery";
import { Participants } from "@/components/Participants";
import { Participate } from "@/components/Participate";
import { Reset } from "@/components/Reset";
import { Winners } from "@/components/Winners";
import useLotteryContractRead from "@/hooks/useLotteryContractRead";
import { Text } from "@chakra-ui/react";

export default function Play() {
  const methodName = "lotteryOpen";
  const methodParams: any[] = [];
  const { data, fetching, error, errorMessage, success } =
    useLotteryContractRead({
      methodName,
      methodParams,
      watch: true,
    });
  return (
    <>
      <Text>Play Lottery: {"" + data}</Text>
      <Participate />
      <Reset />
      <Participants />
      <CloseLottery />
      <Text>Winners</Text>
      <Winners />
    </>
  );
}
