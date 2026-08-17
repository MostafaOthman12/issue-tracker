import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

const loading = () => {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* Issue content */}
      <div className="space-y-3 sm:col-span-4">
        {/* Title skeleton */}
        <Skeleton height={32} width="60%" />

        {/* Status badge + date row */}
        <Flex gap="3" my="2" align="center">
          <Skeleton height={22} width={80} borderRadius={9999} />
          <Skeleton height={16} width={120} />
        </Flex>

        {/* Description card skeleton */}
        <Card>
          <Box p="2">
            <Skeleton count={5} height={16} />
          </Box>
        </Card>
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
