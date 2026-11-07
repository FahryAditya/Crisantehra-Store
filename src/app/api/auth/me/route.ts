import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    try {
      // Fetch fresh profile data from DB
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
        },
      });

      if (user) {
        return NextResponse.json({
          authenticated: true,
          user,
        });
      }
    } catch {
      // Fallback to token payload if DB is temporarily unreachable
      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.userId,
          email: session.email,
          name: session.name,
          role: session.role,
        },
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
