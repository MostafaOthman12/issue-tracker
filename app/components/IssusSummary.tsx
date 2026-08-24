import prisma from "@/app/db/prisma";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import NextLink from "next/link";

const statConfig = [
  { label: "Open Issues",       status: "OPEN",        color: "var(--red-9)"    },
  { label: "In Progress",       status: "IN_PROGRESS", color: "var(--orange-9)" },
  { label: "Closed Issues",     status: "CLOSED",      color: "var(--green-9)"  },
] as const;

const IssueSummary = async () => {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  const counts = [open, inProgress, closed];

  return (
    <Flex gap="4">
      {statConfig.map(({ label, status, color }, i) => (
        <Card key={status} style={{ flex: 1, borderLeft: `3px solid ${color}` }}>
          <NextLink
            href={`/issues?status=${status}`}
            style={{ textDecoration: "none" }}
          >
            <Flex direction="column" gap="1">
              <Text size="2" color="gray">{label}</Text>
              <Text size="8" weight="bold" style={{ color }}>
                {counts[i]}
              </Text>
            </Flex>
          </NextLink>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
