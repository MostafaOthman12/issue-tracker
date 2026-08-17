"use client";

import { Callout, Heading } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import IssueForm, { IssueFormData } from "@/app/components/IssueForm";

const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const onSubmit = async (data: IssueFormData) => {
    setError(false);
    const res = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/issues");
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-xl">
      <Heading as="h2" align="center" className="mb-5">
        Create New Issue
      </Heading>

      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Something went wrong. Please try again later.</Callout.Text>
        </Callout.Root>
      )}

      <IssueForm onSubmit={onSubmit} submitLabel="Submit New Issue" />
    </div>
  );
};

export default NewIssue;
