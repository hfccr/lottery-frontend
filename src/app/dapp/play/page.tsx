"use client";

import useLotteryContractRead from "@/hooks/useLotteryContractRead";

export default function Play() {
  const methodName = "lotteryOpen";
  const methodParams: any[] = [];
  const { data, fetching, error, errorMessage, success } =
    useLotteryContractRead({
      methodName,
      methodParams,
      watch: true,
    });
  return <>Play Lottery: {"" + data}</>;
}
