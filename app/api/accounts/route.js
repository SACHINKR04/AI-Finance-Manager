import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(req) {
  try {
    
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    
    const body = await req.json();
    const { name, type, initialBalance } = body;

    if (!name || !type) {
      return new Response("Missing required fields", { status: 400 });
    }

    
    const account = await db.account.create({
      data: {
        name,
        type, 
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
