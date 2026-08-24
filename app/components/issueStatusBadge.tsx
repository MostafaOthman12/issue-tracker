import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma/enums";

interface Props {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: "red" | "orange" | "green" }> = {
  OPEN:        { label: "Open",        color: "red"    },
  IN_PROGRESS: { label: "In Progress", color: "orange" },
  CLOSED:      { label: "Closed",      color: "green"  },
};

const IssueStatusBadge = ({ status }: Props) => {
  const { label, color } = statusMap[status];
  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
