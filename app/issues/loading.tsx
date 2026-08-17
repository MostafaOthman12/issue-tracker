import { Button, Table } from "@radix-ui/themes";
import Link from "../components/links";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingIssuesPage = () => {
  return (
    <>
      <div className="mb-5">
        <Button loading={true}>
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
          {Array.from({ length: 7 }).map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuesPage;
