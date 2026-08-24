import { Button, Flex, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "@/app/components/links";
import { Issue } from "@/app/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import IssuesStatuesFilter from "@/app/components/IssuesStatuesFilter";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import IssueStatusBadge from "../components/issueStatusBadge";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    status: string;
    sort: string;
    order: string;
    page: string;
  }>;
}
const Issues = async ({ searchParams }: Props) => {
  const { status, sort, order, page } = await searchParams;
  const url = new URL("http://localhost:3000/api/issues");
  if (status && status !== "all") url.searchParams.set("status", status);
  if (sort) url.searchParams.set("sort", sort);
  if (order) url.searchParams.set("order", order);
  if (page) url.searchParams.set("page", page);

  const sortHref = (col: string) => {
    const isSameCol = sort === col;
    const nextOrder = isSameCol && order === "asc" ? "desc" : "asc";
    const params = new URLSearchParams();
    params.set("sort", col);
    params.set("order", nextOrder);
    if (status && status !== "all") params.set("status", status);
    if (page) params.set("page", page);
    return `?${params}`;
  };

  const arrow = (col: string) =>
    sort === col ? (
      order === "desc" ? (
        <ArrowDownIcon className="inline ml-1" />
      ) : (
        <ArrowUpIcon className="inline ml-1" />
      )
    ) : null;

  const { issues, issueCount } = await fetch(url.toString())
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);
      return res.json();
    })
    .catch((e) => {
      console.error(e);
      return { issues: [], issueCount: 0 };
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
            <Table.ColumnHeaderCell>
              <Link href={sortHref("title")}>Title{arrow("title")}</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href={sortHref("description")}>
                Description{arrow("description")}
              </Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href={sortHref("status")}>Status{arrow("status")}</Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              <Link href={sortHref("createdAt")}>
                Created At{arrow("createdAt")}
              </Link>
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
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell max-w-xs">
                  <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
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
