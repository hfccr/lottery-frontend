"use client";
import { Card, CardBody, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <NextLink href="/dapp/play">
        <Card variant="outlined">
          <CardBody>
            <VStack>
              <Image
                src="/lottery.svg"
                alt="Lottery dApp Logo"
                width={180}
                height={37}
                priority
              />
              <h2 className="mb-3 text-2xl font-semibold">Play Lottery</h2>
            </VStack>
          </CardBody>
        </Card>
      </NextLink>
    </main>
  );
}
