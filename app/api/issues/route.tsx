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
  const statusParam = request.nextUrl.searchParams.get("status");
  const sortParam = request.nextUrl.searchParams.get("sort");
  const orderParam = request.nextUrl.searchParams.get("order");
  const pageParam = request.nextUrl.searchParams.get("page");
  const validStatuses: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const sortFields: string[] = ["title", "description", "status", "createdAt"];
  const pageSize = 10;
  const status =
    statusParam && validStatuses.includes(statusParam as Status)
      ? (statusParam as Status)
      : undefined;

  const sort =
    sortParam && sortFields.includes(sortParam) ? sortParam : "createdAt";

  const order: "asc" | "desc" = orderParam === "asc" ? "asc" : "desc";
  const page = pageParam ? parseInt(pageParam) : 1;
  const issues = await prisma.issue.findMany({
    where: status ? { status } : undefined,
    orderBy: { [sort]: order },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const totalIssueCount = await prisma.issue.count({
    where: status ? { status } : undefined,
  });

  return NextResponse.json(
    { issues, issueCount: totalIssueCount },
    { status: 200 },
  );
}

// ─── POST /api/issues ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.issues },
      { status: 400 },
    );
  }

  const issue = await prisma.issue.create({ data: validation.data });

  return NextResponse.json(issue, { status: 201 });
}
