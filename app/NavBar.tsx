"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa6";
import { Box, Button, Flex, Link, Separator, Text } from "@radix-ui/themes";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();

  return (
    <Box
      asChild
      position="sticky"
      top="0"
      style={{ zIndex: 50, backdropFilter: "blur(12px)" }}
      className="border-b border-zinc-200/60 bg-white/80 shadow-sm"
    >
      <nav>
        <Flex align="center" justify="between" px="6" height="64px">
          {/* Logo */}
          <Link asChild underline="none">
            <NextLink href="/">
              <Flex align="center" gap="2">
                <Flex
                  align="center"
                  justify="center"
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: "var(--radius-3)",
                    background:
                      "linear-gradient(135deg, var(--violet-9), var(--indigo-9))",
                    color: "white",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px var(--violet-a5)",
                    flexShrink: 0,
                  }}
                >
                  <FaBug />
                </Flex>
                <Text
                  size="2"
                  weight="medium"
                  color="gray"
                  highContrast
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Issue Tracker
                </Text>
              </Flex>
            </NextLink>
          </Link>

          {/* Nav links + Auth */}
          <Flex
            as="ul"
            align="center"
            gap="1"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {links.map((link) => {
              const isActive = link.href === currentPath;
              return (
                <Box as="li" key={link.href}>
                  <Link
                    asChild
                    underline="none"
                    color={isActive ? "violet" : "gray"}
                    highContrast={isActive}
                  >
                    <NextLink
                      href={link.href}
                      style={{
                        display: "inline-block",
                        position: "relative",
                        padding: "6px 14px",
                        borderRadius: "var(--radius-3)",
                        fontSize: "var(--font-size-2)",
                        fontWeight: "var(--font-weight-medium)",
                        background: isActive ? "var(--violet-a3)" : undefined,
                        transition: "background 150ms, color 150ms",
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <Box
                          style={{
                            position: "absolute",
                            left: "10px",
                            right: "10px",
                            bottom: "4px",
                            height: "2px",
                            borderRadius: "var(--radius-full)",
                            background: "var(--violet-9)",
                          }}
                        />
                      )}
                    </NextLink>
                  </Link>
                </Box>
              );
            })}

            {/* Separator */}
            <Box mx="2">
              <Separator orientation="vertical" size="1" />
            </Box>

            {/* Auth */}
            <Box as="li">
              <Flex align="center" gap="2">
                <Show when="signed-out">
                  <SignInButton>
                    <Button
                      variant="ghost"
                      color="gray"
                      size="2"
                      style={{ cursor: "pointer" }}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button
                      variant="solid"
                      color="violet"
                      size="2"
                      radius="medium"
                      style={{ cursor: "pointer" }}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton
                    appearance={{
                      elements: { avatarBox: "w-8 h-8 ring-2 ring-violet-200" },
                    }}
                  />
                </Show>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </nav>
    </Box>
  );
};

export default NavBar;
