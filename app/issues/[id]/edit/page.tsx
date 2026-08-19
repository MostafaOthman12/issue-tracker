"use client";

import { Callout, Heading } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IssueForm, { IssueFormData } from "@/app/components/IssueForm";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = ({ params }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [issueId, setIssueId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<
    Partial<IssueFormData> | undefined
  >(undefined);

  useEffect(() => {
    params.then(({ id }) => {
      const numId = parseInt(id);
      setIssueId(numId);
      fetch(`/api/issues/${numId}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch issue: ${res.status}`);
          return res.json();
        })
        .then((issue) => {
          setDefaultValues({
            title: issue.title,
            description: issue.description,
            status: issue.status,
          });
        })
        .catch((e) => { console.error(e); setError(true); });
    });
  }, [params]);

  const onSubmit = async (data: IssueFormData) => {
    setError(false);
    const res = await fetch(`/api/issues/${issueId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      router.push(`/issues/${issueId}`);
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-xl">
      <Heading as="h2" align="center" className="mb-5">
        Edit Issue
      </Heading>

      {error && (
        <Callout.Root className="mb-3" color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Something went wrong. Please try again.</Callout.Text>
        </Callout.Root>
      )}

      {defaultValues && (
        <IssueForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          showStatus
        />
      )}
    </div>
  );
};

export default EditIssuePage;
