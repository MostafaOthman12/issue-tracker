import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../db/prisma";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  } else {
    const createIssue = await prisma.issue.create({ data: body });
    console.log(createIssue);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

export async function GET(request: NextRequest) {
  const allIssues = await prisma.issue.findMany();
  return NextResponse.json(allIssues, { status: 200 });
}
