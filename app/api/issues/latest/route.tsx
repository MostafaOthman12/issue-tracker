import { NextResponse } from "next/server";
import prisma from "@/app/db/prisma";

export async function GET() {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { assignedToUser: true },
  });

  return NextResponse.json(issues);
}
