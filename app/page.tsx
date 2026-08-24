import { Box, Flex } from "@radix-ui/themes";
import LatestIssues from "./components/LatestIssues";
import IssueSummary from "./components/IssusSummary";

export default function Home() {
  return (
    <Flex direction="column" gap="5" maxWidth="700px" mx="auto" mt="6">
      <IssueSummary />
      <LatestIssues />
    </Flex>
  );
}
