import prisma from "@/app/db/prisma";
import { Card, Flex, Text } from "@radix-ui/themes";
import NextLink from "next/link";

const IssueSummary = async () => {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  const statuses = [
    { label: "Open Issues", count: open, status: "OPEN" },
    { label: "In Progress Issues", count: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", count: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ label, count, status }) => (
        <Card key={status} style={{ flex: 1 }}>
          <Flex direction="column" gap="1">
            <NextLink
              href={`/issues?status=${status}`}
              style={{ fontSize: "var(--font-size-2)", textDecoration: "none", color: "var(--gray-11)" }}
            >
              {label}
            </NextLink>
            <Text size="7" weight="bold">
              {count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
