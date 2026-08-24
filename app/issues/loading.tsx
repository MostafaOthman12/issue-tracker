import { Badge, Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "@/app/components/links";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuesPage = () => {
  return (
    <Box maxWidth="860px" mx="auto">
      {/* Toolbar skeleton */}
      <Flex align="center" justify="between" mb="5">
        <Flex align="center" gap="3">
          <Heading size="5">Issues</Heading>
          <Badge color="gray" variant="soft" radius="full">
            <Skeleton width={20} />
          </Badge>
        </Flex>
        <Flex align="center" gap="3">
          <Box width="130px"><Skeleton height={32} borderRadius={6} /></Box>
          <Button loading={true}>
            <Link href="issues/new">
              <PlusIcon />
              New Issue
            </Link>
          </Button>
        </Flex>
      </Flex>

      {/* Sort bar skeleton */}
      <Flex gap="4" mb="2" px="3" className="hidden md:flex">
        <Box style={{ flex: 2 }}><Skeleton width={60} /></Box>
        <Box style={{ flex: 1 }}><Skeleton width={50} /></Box>
        <Box style={{ flex: 1 }}><Skeleton width={55} /></Box>
      </Flex>

      {/* Card skeletons */}
      <Flex direction="column" gap="2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Card key={i}>
            <Flex align="center" gap="4">
              <Box style={{ flex: 2 }}><Skeleton width="60%" /></Box>
              <Box style={{ flex: 1 }} className="hidden md:block"><Skeleton width={80} /></Box>
              <Box style={{ flex: 1 }} className="hidden md:block"><Skeleton width={90} /></Box>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default LoadingIssuesPage;
