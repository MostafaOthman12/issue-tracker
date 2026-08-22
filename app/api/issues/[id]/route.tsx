import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface Props {
  params: Promise<{ id: string }>;
}

const updateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z.string().optional(),
});

function parseId(id: string) {
  const parsed = parseInt(id);
  return isNaN(parsed) ? null : parsed;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: NextRequest, { params }: Props) {
  const { id } = await params;
  const issueId = parseId(id);

  if (!issueId) {
    return errorResponse("Invalid issue ID", 400);
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) {
    return errorResponse("Issue not found", 404);
  }

  return NextResponse.json(issue, { status: 200 });
}

export async function DELETE(_request: NextRequest, { params }: Props) {
  const { id } = await params;
  const issueId = parseId(id);

  if (!issueId) {
    return errorResponse("Invalid issue ID", 400);
  }

  const existingIssue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!existingIssue) {
    return errorResponse("Issue not found", 404);
  }

  await prisma.issue.delete({ where: { id: issueId } });

  return new NextResponse(null, { status: 204 });
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  const body = await request.json();
  const validation = updateIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.issues },
      { status: 400 },
    );
  }

  const existingIssue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!existingIssue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: validation.data.title,
      description: validation.data.description,
      status: validation.data.status,
      assignedToUserId: validation.data.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
