import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

export const loading = () => {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* Issue content */}
      <div className="space-y-3 sm:col-span-4">
        <Heading>Title</Heading>
        <Flex gap="3" my="2" align="center">
          Status <Text color="gray">Date</Text>
        </Flex>
        <Card className="prose max-w-full">Description</Card>
      </div>

      {/* Actions sidebar */}
      <Flex direction="column" gap="3">
        <EditIssueButton loading={true} issueId={0} />
        <DeleteIssueButton loading={true} issueId={0} />
      </Flex>
    </Grid>
  );
};

export default loading;
