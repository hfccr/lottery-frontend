"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Connect from "./Connect";

interface Props {
  children: React.ReactNode;
  href: string;
}

const Links = [
  {
    label: "Play",
    href: "/dapp/play",
  },
];

const NavLink = (props: Props) => {
  const { children, href } = props;
  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Link as={NextLink} href={href}>
        {children}
      </Link>
    </Box>
  );
};

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4}>
        <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink href="/">
              <Image
                src="/lottery.svg"
                alt="Lottery dApp Logo"
                width={72}
                height={72}
              />
            </NavLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  <Heading>{link.label}</Heading>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Connect />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
