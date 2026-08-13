"use client";
import { Button, Callout, Heading, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import z from "zod";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const issueFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type IssueForm = z.infer<typeof issueFormSchema>;

const NewIssue = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" align="center" className="mb-5">
        Create New Issue
      </Heading>
      {error && (
        <Callout.Root className="mb-3">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Something went wrong. Please try again later.
          </Callout.Text>
        </Callout.Root>
      )}
      <div className="space-y-3 max-w-xl">
        <TextField.Root {...register("title")} placeholder="Title" />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default NewIssue;
