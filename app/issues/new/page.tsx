import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <>
      <Heading as="h2" align="center">
        Create New Issue
      </Heading>
      <div className="space-y-3 max-w-xl">
        <TextField.Root placeholder="Title" />
        <TextArea placeholder="Description" />
        <Button>Submit</Button>
      </div>
    </>
  );
};

export default NewIssue;
