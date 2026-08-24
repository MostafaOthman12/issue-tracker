import { Badge, Flex } from "@radix-ui/themes";
import React from "react";
import { Status } from "../generated/prisma/enums";

interface Props {
  status: Status;
}
const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Flex gap="2">
      {status === "OPEN" && <Badge color="red">{status}</Badge>}
      {status === "IN_PROGRESS" && <Badge color="orange">{status}</Badge>}
      {status === "CLOSED" && <Badge color="green">{status}</Badge>}
    </Flex>
  );
};
export default IssueStatusBadge;
