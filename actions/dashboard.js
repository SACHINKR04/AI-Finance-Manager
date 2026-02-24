"use server";

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client"; 

// Serialize Account
const serializeAccount = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) serialized.balance = obj.balance.toNumber();
  return serialized;
};

// Serialize Transaction
const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.amount) serialized.amount = obj.amount.toNumber();
  return serialized;
};

// ✅ Get all user accounts
export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { transactions: true } },
    },
  });

  return accounts.map(serializeAccount);
}

// ✅ Create account
export async function createAccount(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const req = await request();
  const decision = await aj.protect(req, { userId, requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error("Request blocked");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const balanceFloat = parseFloat(data.balance);
  if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

  const existingAccounts = await db.account.findMany({
    where: { userId: user.id },
  });

  const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

  if (shouldBeDefault) {
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  const account = await db.account.create({
    data: {
      ...data,
      balance: new Prisma.Decimal(balanceFloat),
      userId: user.id,
      isDefault: shouldBeDefault,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, data: serializeAccount(account) };
}

// ✅ Get dashboard transactions
export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}
