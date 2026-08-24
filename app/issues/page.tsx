import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "@/app/components/links";
import { Issue } from "@/app/generated/prisma/client";
import IssuesStatuesFilter from "@/app/components/IssuesStatuesFilter";
import { ArrowUpIcon, ArrowDownIcon, PlusIcon } from "@radix-ui/react-icons";
import IssueStatusBadge from "../components/issueStatusBadge";
import { Pagination } from "../components/Pagination";

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
    <Box maxWidth="860px" mx="auto">
      {/* ── Toolbar ── */}
      <Flex align="center" justify="between" mb="5">
        <Flex align="center" gap="3">
          <Heading size="5">Issues</Heading>
          <Badge color="gray" variant="soft" radius="full">
            {issueCount}
          </Badge>
        </Flex>
        <Flex align="center" gap="3">
          <IssuesStatuesFilter />
          <Button asChild>
            <NextLink href="issues/new">
              <PlusIcon />
              New Issue
            </NextLink>
          </Button>
        </Flex>
      </Flex>

      {/* ── Sort bar (desktop only) ── */}
      <Flex gap="4" mb="2" px="3" className="hidden md:flex">
        <Text size="1" color="gray" weight="medium" style={{ flex: 2 }}>
          <Link href={sortHref("title")}>Title {arrow("title")}</Link>
        </Text>
        <Text size="1" color="gray" weight="medium" style={{ flex: 1 }}>
          <Link href={sortHref("status")}>Status {arrow("status")}</Link>
        </Text>
        <Text size="1" color="gray" weight="medium" style={{ flex: 1 }}>
          <Link href={sortHref("createdAt")}>Created {arrow("createdAt")}</Link>
        </Text>
      </Flex>

      {/* ── Issue cards ── */}
      {issues && issues.length > 0 ? (
        <Flex direction="column" gap="2">
          {issues.map((issue: Issue) => (
            <Card key={issue.id} asChild>
              <NextLink
                href={`/issues/${issue.id}`}
                style={{ textDecoration: "none" }}
              >
                <Flex align="center" gap="4">
                  <Box style={{ flex: 2, minWidth: 0 }}>
                    <Text
                      size="2"
                      weight="medium"
                      style={{
                        color: "var(--gray-12)",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {issue.title}
                    </Text>
                  </Box>

                  <Box style={{ flex: 1 }} className="hidden md:block">
                    <IssueStatusBadge status={issue.status} />
                  </Box>

                  <Box style={{ flex: 1 }} className="hidden md:block">
                    <Text
                      size="2"
                      color="gray"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {new Date(issue.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </Box>
                </Flex>
              </NextLink>
            </Card>
          ))}
        </Flex>
      ) : (
        <Card>
          <Text color="gray" size="2">
            No issues found.
          </Text>
        </Card>
      )}

      <Pagination
        currentPage={parseInt(page || "1")}
        itemCount={issueCount}
        pageSize={10}
      />
    </Box>
  );
};

export default Issues;
