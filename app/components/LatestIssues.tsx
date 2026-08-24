import { Avatar, Box, Button, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { Issue, User } from "@/app/generated/prisma/client";
import NextLink from "next/link";
import IssueStatusBadge from "@/app/components/issueStatusBadge";

const LatestIssues = async () => {
  const issues: ({ assignedToUser: User | null } & Issue)[] = await fetch(
    "http://localhost:3000/api/issues/latest",
  ).then((res) => res.json());

  return (
    <Box>
      <Flex justify="between" align="center" mb="4">
        <Heading size="5">Latest Issues</Heading>
        <Button asChild variant="soft" color="violet" size="2">
          <NextLink href="/issues">View all</NextLink>
        </Button>
      </Flex>

      <Card>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Assignee</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.length === 0 ? (
              <Table.Row>
                <Table.Cell>
                  <Text color="gray">No issues found.</Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              issues.map((issue) => (
                <Table.Row
                  key={issue.id}
                  className="hover:bg-(--accent-2) transition-colors duration-150"
                >
                  <Table.Cell>
                    <Flex direction="column" gap="1">
                      <NextLink
                        href={`/issues/${issue.id}`}
                        style={{ color: "var(--gray-12)", fontWeight: 500, textDecoration: "none" }}
                      >
                        {issue.title}
                      </NextLink>
                      <Box className="md:hidden">
                        <IssueStatusBadge status={issue.status} />
                      </Box>
                    </Flex>
                  </Table.Cell>

                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>

                  <Table.Cell className="hidden md:table-cell">
                    <Text size="2" color="gray">
                      {new Date(issue.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </Table.Cell>

                  <Table.Cell className="hidden md:table-cell">
                    {issue.assignedToUser ? (
                      <Avatar
                        src={issue.assignedToUser.image ?? undefined}
                        fallback={issue.assignedToUser.name?.[0] ?? "?"}
                        radius="full"
                        size="2"
                      />
                    ) : (
                      <Text size="2" color="gray">—</Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Card>
    </Box>
  );
};

export default LatestIssues;
