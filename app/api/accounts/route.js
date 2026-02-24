import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    // ✅ Clerk user authentication
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // ✅ Parse request body
    const body = await req.json();
    const { name, type, initialBalance } = body;

    if (!name || !type) {
      return new Response("Missing required fields", { status: 400 });
    }

    // ✅ Create account in DB
    const account = await prisma.account.create({
      data: {
        name,
        type, // must be "CURRENT" or "SAVINGS"
        balance: initialBalance ? parseFloat(initialBalance) : 0,
        userId,
      },
    });

    return new Response(JSON.stringify(account), { status: 201 });
  } catch (error) {
    console.error("❌ Account creation failed:", error);
    return new Response("Server error", { status: 500 });
  }
}
