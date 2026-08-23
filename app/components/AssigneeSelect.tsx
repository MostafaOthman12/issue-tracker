"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  issueId: number;
  assignedToUserId: string | null;
}

const AssigneeSelect = ({ issueId, assignedToUserId }: Props) => {
  const router = useRouter();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => fetch(`/api/users`).then((res) => res.json()),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
    retryDelay: 1000,
    refetchInterval: false,
  });
  const [assigneeId, setAssigneeId] = useState("");

  const handleSubmit = async (value: string) => {
    setAssigneeId(value);
    const res = await fetch(`/api/issues/${issueId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignedToUserId: value === "unassigned" ? null : value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update issue");
        } else {
          toast.success("Success!");
          router.refresh();
        }
      })
      .catch((e) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={assignedToUserId || "unassigned"}
        onValueChange={handleSubmit}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {isLoading ? (
              <Select.Item value="loading">Loading...</Select.Item>
            ) : error ? (
              <Select.Item value="error">Error</Select.Item>
            ) : (
              users?.map((user: User) => (
                <Select.Item key={user?.id || ""} value={user?.id || ""}>
                  {user?.name}
                </Select.Item>
              ))
            )}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
