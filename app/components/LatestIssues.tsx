import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Issue, User } from "@/app/generated/prisma/client";
import NextLink from "next/link";
import IssueStatusBadge from "@/app/components/issueStatusBadge";

const LatestIssues = async () => {
  const issues: ({ assignedToUser: User | null } & Issue)[] = await fetch(
    "http://localhost:3000/api/issues/latest",
  ).then((res) => res.json());

  return (
    <Card>
      <Flex align="center" justify="between" mb="3">
        <Heading size="3">Latest Issues</Heading>
        <Button asChild variant="ghost" size="1" color="gray">
          <NextLink href="/issues">View all →</NextLink>
        </Button>
      </Flex>

      <Separator size="4" mb="3" />

      {issues.length === 0 ? (
        <Text color="gray" size="2">
          No issues yet.
        </Text>
      ) : (
        <Flex direction="column" gap="1">
          {issues.map((issue, i) => (
            <Box key={issue.id}>
              <NextLink
                href={`/issues/${issue.id}`}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  gap="3"
                  py="2"
                  px="1"
                  style={{
                    borderRadius: "var(--radius-2)",
                    transition: "background 150ms",
                  }}
                  className="hover:bg-(--accent-a2)"
                >
                  {/* Status dot */}
                  <Box
                    flexShrink="0"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        issue.status === "OPEN"
                          ? "var(--red-9)"
                          : issue.status === "IN_PROGRESS"
                            ? "var(--orange-9)"
                            : "var(--green-9)",
                    }}
                  />

                  {/* Title + badge */}
                  <Flex
                    direction="column"
                    gap="1"
                    flexGrow="1"
                    style={{ minWidth: 0 }}
                  >
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        color: "var(--gray-12)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {issue.title}
                    </Text>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {/* Assignee avatar */}
                  {issue.assignedToUser ? (
                    <Avatar
                      src={issue.assignedToUser.image ?? undefined}
                      fallback={issue.assignedToUser.name?.[0] ?? "?"}
                      radius="full"
                      size="1"
                      style={{ flexShrink: 0 }}
                    />
                  ) : (
                    <Box
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        borderRadius: "50%",
                        border: "1.5px dashed var(--gray-a7)",
                      }}
                    />
                  )}
                </Flex>
              </NextLink>
              {i < issues.length - 1 && <Separator size="4" />}
            </Box>
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default LatestIssues;
