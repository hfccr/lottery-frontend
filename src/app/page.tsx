"use client";
import { Box, Card, CardBody, Heading, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <NextLink href="/dapp/play">
        <Box className="relative">
          <Image
            src="/hero.svg"
            alt="Lottery Play Logo"
            width={380}
            height={380}
            priority
          />
          <Heading className="mb-3 text-4xl font-semibold absolute bottom-14">
            Play
          </Heading>
        </Box>
      </NextLink>
    </main>
  );
}
