"use client";

import { BookmarkIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export const issueFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

export type IssueFormData = z.infer<typeof issueFormSchema>;

interface Props {
  defaultValues?: Partial<IssueFormData>;
  onSubmit: SubmitHandler<IssueFormData>;
  submitLabel?: string;
  showStatus?: boolean;
}

const IssueForm = ({
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  showStatus = false,
}: Props) => {
  const { register, control, handleSubmit, formState } =
    useForm<IssueFormData>({
      resolver: zodResolver(issueFormSchema),
      defaultValues,
    });

  return (
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
            <Callout.Text>{formState.errors.description.message}</Callout.Text>
          </Callout.Root>
        )}

        {showStatus && (
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
        )}

        <Button disabled={formState.isSubmitting}>
          {formState.isSubmitting ? (
            <Spinner loading>
              <BookmarkIcon />
            </Spinner>
          ) : (
            <>
              <BookmarkIcon />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;
