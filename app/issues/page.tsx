import { Button, Flex, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "@/app/components/links";
import { Issue } from "@/app/generated/prisma/client";
import { issueStatusBadge } from "@/app/components/issueStatusBadge";
import ReactMarkdown from "react-markdown";
import IssuesStatuesFilter from "@/app/components/IssuesStatuesFilter";

export const dynamic = "force-dynamic";

const Issues = async () => {
  const issues: Issue[] = await fetch("http://localhost:3000/api/issues")
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);
      return res.json();
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
  return (
    <>
      <Flex justify="between" className="mb-5">
        <Button asChild>
          <NextLink href="issues/new">Create Issue</NextLink>
        </Button>
        <IssuesStatuesFilter />
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues ? (
            issues.map((issue: Issue) => (
              <Table.Row
                key={issue.id}
                className="hover:bg-(--accent-2) transition-colors duration-150"
              >
                <Table.Cell>
                  <div className="flex flex-col gap-1">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    {/* Status badge visible only on mobile */}
                    <div className="md:hidden">
                      {issueStatusBadge(issue.status)}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell max-w-xs">
                  <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issueStatusBadge(issue.status)}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell text-sm text-(--gray-11) whitespace-nowrap">
                  {new Date(issue.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <tr>
              <Table.Cell align="center">
                <Text color="red">No issues found</Text>
              </Table.Cell>
            </tr>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Issues;
