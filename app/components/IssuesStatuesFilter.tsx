"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssuesStatuesFilter = () => {
  const [status, setStatus] = React.useState<string>("all");
  const handleValueChange = (value: string) => {
    setStatus(value);
  };
  return (
    <Select.Root defaultValue="all" onValueChange={handleValueChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="all">All</Select.Item>
          <Select.Item value="open">OPEN</Select.Item>
          <Select.Item value="in_progress">IN PROGRESS</Select.Item>
          <Select.Item value="closed">CLOSED</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatuesFilter;
