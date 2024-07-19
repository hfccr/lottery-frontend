"use client";

import { Participants } from "@/components/Participants";
import { Participate } from "@/components/Participate";
import { Reset } from "@/components/Reset";
import { Winners } from "@/components/Winners";
import {
  Divider,
  Heading,
  HStack,
  Stack,
  VStack,
  Container,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

export default function Play() {
  return (
    <Container maxW="3xl">
      <VStack align="flex-start" spacing={3}>
        <Stack
          paddingTop={4}
          width="100%"
          direction="row"
          justify="space-between"
          align="center"
          spacing={2}
        >
          <HStack align="center">
            <Image
              src="/hero.svg"
              alt="Lottery Play Logo"
              width={42}
              height={42}
              priority
            />
            <Heading>Play</Heading>
          </HStack>
          <Reset />
        </Stack>
        <Divider />
        <Participate />
        <HStack align="flex-start" justify="flex-start" width="100%">
          <Box width="50%">
            <Participants />
          </Box>
          <Box width="50%">
            <Winners />
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
}
