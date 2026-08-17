import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/db/prisma";
import { Status } from "@/app/generated/prisma/enums";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

// ─── GET /api/issues ──────────────────────────────────────────────────────────
// Supports optional ?status=OPEN|IN_PROGRESS|CLOSED query param

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");

  const validStatuses: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status =
    statusParam && validStatuses.includes(statusParam as Status)
      ? (statusParam as Status)
      : undefined;

  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(issues, { status: 200 });
}

// ─── POST /api/issues ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.issues },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.create({ data: validation.data });

  return NextResponse.json(issue, { status: 201 });
}
