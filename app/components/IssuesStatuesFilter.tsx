"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Status } from "@/app/generated/prisma/enums";
import { useState } from "react";
const IssuesStatuesFilter = () => {
  const [status, setStatus] = useState<string>("all");
  const router = useRouter();
  const handleValueChange = (value: string) => {
    if (value === "all") {
      setStatus("all");
      router.push(`/issues`);
    } else {
      setStatus(value);
      router.push(`/issues?status=${value}`);
    }
  };
  return (
    <Select.Root defaultValue="all" onValueChange={handleValueChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="all">All</Select.Item>
          {Object.values(Status).map((s) => (
            <Select.Item key={s} value={s}>
              {s}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatuesFilter;
