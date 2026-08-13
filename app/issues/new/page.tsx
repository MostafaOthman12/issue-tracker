"use client";
import { Button, Callout, Heading, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const issueFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type IssueForm = z.infer<typeof issueFormSchema>;

const NewIssue = () => {
  const { register, control, handleSubmit, formState } = useForm<IssueForm>({
    resolver: zodResolver(issueFormSchema),
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    const result = await fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
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
          <Callout.Text>
            Something went wrong. Please try again later.
          </Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 max-w-xl">
          <TextField.Root {...register("title")} placeholder="Title" />
          {formState.errors.title && (
            <Callout.Root className="mb-3" color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{formState.errors.title?.message}</Callout.Text>
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
            <Callout.Root className="mb-3" color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {formState.errors.description?.message}
              </Callout.Text>
            </Callout.Root>
          )}
          <Button type="submit">Submit New Issue</Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssue;
