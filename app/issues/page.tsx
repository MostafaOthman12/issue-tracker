import { Badge, Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { Issue } from "../generated/prisma/client";
import { issueStatusBadge } from "../components/issueStatusBadge";
import delay from "delay";
const Issues = async () => {
  await delay(5000);
  const issues: Issue[] = await fetch("http://localhost:3000/api/issues")
    .then((res) => res.json())
    .catch((e) => console.log(e));
  console.log(issues);
  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href="issues/new">Create Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              Description
            </Table.Cell>
            <Table.Cell className=" hidden md:table-cell">Status</Table.Cell>
            <Table.Cell className=" hidden md:table-cell">
              Created At
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue: Issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.description}
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                {issueStatusBadge(issue.status)}
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                {issue.createdAt.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Issues;
