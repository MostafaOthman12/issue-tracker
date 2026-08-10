"use client";
import { Button, Heading, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    const Result = await fetch("http://localhost:3000/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (Result.ok) {
      console.log("Issue created successfully");
      router.push("/issues");
    } else {
      console.log("Issue creation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" align="center">
        Create New Issue
      </Heading>
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
