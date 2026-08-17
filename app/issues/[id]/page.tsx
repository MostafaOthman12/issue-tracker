import prisma from "@/app/db/prisma";
import { issueStatusBadge } from "@/app/components/issueStatusBadge";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import delay from "delay";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* Issue content */}
      <div className="space-y-3 sm:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2" align="center">
          {issueStatusBadge(issue.status)}
          <Text size="2" color="gray">
            {issue.createdAt.toDateString()}
          </Text>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>

      {/* Actions sidebar */}
      <Flex direction="column" gap="3">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
