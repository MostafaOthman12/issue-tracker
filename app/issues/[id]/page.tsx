import prisma from "@/app/db/prisma";
import IssueStatusBadge from "@/app/components/issueStatusBadge";
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeSelect from "@/app/components/AssigneeSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) notFound();

  return (
    <Box maxWidth="900px" mx="auto">
      <Grid columns={{ initial: "1", sm: "5" }} gap="6">
        {/* ── Issue content ── */}
        <Flex direction="column" gap="4" style={{ gridColumn: "span 4" }}>
          <Box>
            <Heading size="6" mb="2">
              {issue.title}
            </Heading>
            <Flex gap="3" align="center">
              <IssueStatusBadge status={issue.status} />
              <Text size="2" color="gray">
                Opened{" "}
                {issue.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </Flex>
          </Box>

          <Card className="prose max-w-full">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Flex>

        {/* ── Sidebar ── */}
        <Card>
          <Flex direction="column" gap="3">
            <Text size="1" weight="medium" color="gray">
              ASSIGNEE
            </Text>
            <AssigneeSelect
              issueId={issue.id}
              assignedToUserId={issue.assignedToUserId}
            />

            <Separator size="4" />

            <Text size="1" weight="medium" color="gray">
              ACTIONS
            </Text>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
};

export default IssueDetailPage;
