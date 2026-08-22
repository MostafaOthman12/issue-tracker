"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "next-auth";

interface Props {
  issueId: number;
  assignedToUserId: string | null;
}

const AssigneeSelect = ({ issueId, assignedToUserId }: Props) => {
  const router = useRouter();
  const [assigneeId, setAssigneeId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/users`);
        setUsers(await res.json());
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
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
    });
    if (res.ok) {
      router.refresh();
    }
  };
  useEffect(() => {
    setAssigneeId(assignedToUserId || "unassigned");
  }, [assignedToUserId]);
  return (
    <Select.Root value={assigneeId} onValueChange={handleSubmit}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {loading ? (
            <Select.Item value="loading">Loading...</Select.Item>
          ) : (
            users.map((user) => (
              <Select.Item key={user.id} value={user?.id!}>
                {user.name}
              </Select.Item>
            ))
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
