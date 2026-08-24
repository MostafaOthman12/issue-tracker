import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import LatestIssues from "./components/LatestIssues";
import IssueSummary from "./components/IssusSummary";
import IssueChart from "./components/IssueChart";
import prisma from "./db/prisma";

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <Flex direction="column" gap="5" mx="auto" mt="6" style={{ maxWidth: "900px" }}>
      <IssueSummary />

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Card>
          <Heading size="3" mb="4">Issues by Status</Heading>
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Card>

        <Box>
          <LatestIssues />
        </Box>
      </Grid>
    </Flex>
  );
}
