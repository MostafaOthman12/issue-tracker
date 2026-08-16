"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number;
  loading?: boolean;
}

const DeleteIssueButton = ({ issueId, loading }: Props) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    setError(false);
    const res = await fetch(`/api/issues/${issueId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/issues");
      router.refresh();
    } else {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button loading={loading} color="red" disabled={deleting}>
            {deleting ? <Spinner /> : <TrashIcon />}
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="400px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? This action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {error && (
        <p className="text-sm text-red-500 mt-1">
          Failed to delete issue. Please try again.
        </p>
      )}
    </>
  );
};

export default DeleteIssueButton;
