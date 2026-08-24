"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBug } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

const NavBar = () => {
  const session = useSession();
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = href === currentPath;
    return (
      <Box asChild px="3" py="1">
        <NextLink
          href={href}
          onClick={() => setMenuOpen(false)}
          className="rt-reset"
          style={{
            display: "inline-block",
            position: "relative",
            borderRadius: "var(--radius-3)",
            fontSize: "var(--font-size-2)",
            fontWeight: 500,
            color: isActive ? "var(--violet-11)" : "var(--gray-11)",
            background: isActive ? "var(--violet-a3)" : "transparent",
            transition: "background 150ms, color 150ms",
          }}
        >
          {label}
          {isActive && (
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              mx="2"
              height="2px"
              style={{
                borderRadius: "var(--radius-full)",
                background: "var(--violet-9)",
              }}
            />
          )}
        </NextLink>
      </Box>
    );
  };

  const AuthSection = ({ mobile = false }: { mobile?: boolean }) =>
    session.data?.user ? (
      mobile ? (
        /* Mobile: simple row */
        <Flex align="center" gap="3" py="2">
          <Avatar
            src={session.data!.user!.image?.toString()}
            fallback={session.data!.user!.name?.[0]! ?? "?"}
            referrerPolicy="no-referrer"
            radius="full"
            size="2"
          />
          <Box flexGrow="1">
            <Text size="2" weight="medium">
              {session.data.user.name}
            </Text>
          </Box>
          <Link asChild size="2" color="gray">
            <NextLink
              href="/api/auth/signout"
              onClick={() => setMenuOpen(false)}
            >
              Sign out
            </NextLink>
          </Link>
        </Flex>
      ) : (
        /* Desktop: avatar dropdown */
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              className="rt-reset"
              style={{ cursor: "pointer", borderRadius: "var(--radius-full)" }}
            >
              <Avatar
                src={session.data.user.image?.toString()}
                fallback={session.data.user.name?.[0] ?? "?"}
                referrerPolicy="no-referrer"
                radius="full"
                size="2"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" sideOffset={8}>
            <Box px="3" py="2">
              <Text size="2" weight="medium">
                {session.data.user.name}
              </Text>
              <Text size="1" color="gray" as="p">
                {session.data.user.email}
              </Text>
            </Box>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild color="red">
              <NextLink href="/api/auth/signout">Sign out</NextLink>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    ) : mobile ? (
      <Box py="1">
        <Button asChild variant="soft" color="violet" size="2">
          <NextLink href="/api/auth/signin" onClick={() => setMenuOpen(false)}>
            Sign in
          </NextLink>
        </Button>
      </Box>
    ) : (
      <Button asChild variant="soft" color="violet" size="1">
        <NextLink href="/api/auth/signin">Sign in</NextLink>
      </Button>
    );

  return (
    <Box
      asChild
      position="sticky"
      top="0"
      style={{
        zIndex: 50,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--gray-a4)",
        background: "var(--color-panel-translucent)",
        boxShadow: "var(--shadow-2)",
      }}
    >
      <nav>
        {/* ── Top bar ── */}
        <Flex align="center" justify="between" px="5" height="64px">
          {/* Logo */}
          <Link asChild underline="none">
            <NextLink href="/">
              <Flex align="center" gap="2">
                <Flex
                  align="center"
                  justify="center"
                  width="32px"
                  height="32px"
                  flexShrink="0"
                  style={{
                    borderRadius: "var(--radius-3)",
                    background:
                      "linear-gradient(135deg, var(--violet-9), var(--violet-9))",
                    color: "white",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px var(--violet-a5)",
                  }}
                >
                  <FaBug />
                </Flex>
                <Text
                  size="3"
                  weight="bold"
                  color="gray"
                  highContrast
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Issue Tracker
                </Text>
              </Flex>
            </NextLink>
          </Link>

          {/* Desktop: nav links + auth */}
          <Flex
            align="center"
            gap="1"
            display={{ initial: "none", md: "flex" }}
          >
            {links.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
            <Separator orientation="vertical" size="1" mx="3" />
            <AuthSection />
          </Flex>

          {/* Mobile: hamburger */}
          <Box display={{ initial: "block", md: "none" }}>
            <IconButton
              variant="ghost"
              color="gray"
              size="3"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </IconButton>
          </Box>
        </Flex>

        {/* ── Mobile dropdown ── */}
        {menuOpen && (
          <Box
            display={{ initial: "block", md: "none" }}
            px="5"
            pb="4"
            style={{
              borderTop: "1px solid var(--gray-a4)",
              background: "var(--color-panel-translucent)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Flex direction="column" gap="1" pt="3">
              {links.map((l) => (
                <NavLink key={l.href} {...l} />
              ))}
              <Separator size="4" my="2" />
              <AuthSection mobile />
            </Flex>
          </Box>
        )}
      </nav>
    </Box>
  );
};

export default NavBar;
