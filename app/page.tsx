import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import LatestIssues from "./components/LatestIssues";
import IssueSummary from "./components/IssusSummary";
import IssueChart from "./components/IssueChart";
import prisma from "./db/prisma";
import { Metadata } from "next";

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <Box maxWidth="960px" mx="auto">
      {/* ── Page header ── */}
      <Box mb="6">
        <Heading size="6" mb="1">
          Dashboard
        </Heading>
        <Text color="gray" size="2">
          A quick overview of your project's issue activity.
        </Text>
      </Box>

      {/* ── Summary cards ── */}
      <Box mb="5">
        <IssueSummary />
      </Box>

      {/* ── Chart + Latest issues ── */}
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Card>
          <Heading size="3" mb="4">
            Issues by Status
          </Heading>
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Card>

        <LatestIssues />
      </Grid>
    </Box>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of all issues and their status",
};
