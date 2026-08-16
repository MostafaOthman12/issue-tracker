"use client";

import { BookmarkIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Heading,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const editIssueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});

type EditIssueForm = z.infer<typeof editIssueSchema>;

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = ({ params }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [issueId, setIssueId] = useState<number | null>(null);

  const { register, control, handleSubmit, reset, formState } =
    useForm<EditIssueForm>({
      resolver: zodResolver(editIssueSchema),
    });

  useEffect(() => {
    params.then(({ id }) => {
      const numId = parseInt(id);
      setIssueId(numId);
      fetch(`/api/issues/${numId}`)
        .then((res) => res.json())
        .then((issue) => {
          reset({
            title: issue.title,
            description: issue.description,
            status: issue.status,
          });
        });
    });
  }, [params, reset]);

  const onSubmit: SubmitHandler<EditIssueForm> = async (data) => {
    setError(false);
    const res = await fetch(`/api/issues/${issueId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <TextField.Root {...register("title")} placeholder="Title" />
          {formState.errors.title && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{formState.errors.title.message}</Callout.Text>
            </Callout.Root>
          )}

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          {formState.errors.description && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {formState.errors.description.message}
              </Callout.Text>
            </Callout.Root>
          )}

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger placeholder="Status" />
                <Select.Content>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />

          <Button disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <Spinner loading>
                <BookmarkIcon />
              </Spinner>
            ) : (
              <>
                <BookmarkIcon />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditIssuePage;
