"use client";

import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issueId: number;
  loading?: boolean;
}

const EditIssueButton = ({ issueId, loading }: Props) => {
  return (
    <Button variant="soft" loading={loading} asChild>
      <Link href={`/issues/${issueId}/edit`}>
        <Pencil1Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
