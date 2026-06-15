
import { inngest } from "./client";
import { db } from "@/lib/prisma";
import EmailTemplate from "@/emails/template";
import { sendEmail } from "@/actions/send-email";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    name: "Process Recurring Transaction",
    throttle: {
      limit: 10,
      period: "1m",
      key: "event.data.userId",
    },
    triggers: [{ event: "transaction.recurring.process" }],
  },
  async ({ event, step }) => {
    if (!event?.data?.transactionId || !event?.data?.userId) {
      console.error("Invalid event data:", event);
      return { error: "Missing required event data" };
    }

    await step.run("process-transaction", async () => {
      const transaction = await db.transaction.findUnique({
        where: {
          id: event.data.transactionId,
          userId: event.data.userId,
        },
        include: {
          account: true,
        },
      });

      if (!transaction || !isTransactionDue(transaction)) return;

      await db.$transaction(async (tx) => {
        await tx.transaction.create({
          data: {
            type: transaction.type,
            amount: transaction.amount,
            description: `${transaction.description} (Recurring)`,
            date: new Date(),
            category: transaction.category,
            userId: transaction.userId,
            accountId: transaction.accountId,
            isRecurring: false,
          },
        });

        const balanceChange =
          transaction.type === "EXPENSE"
            ? -transaction.amount.toNumber()
            : transaction.amount.toNumber();

        await tx.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: balanceChange } },
        });

        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            lastProcessed: new Date(),
            nextRecurringDate: calculateNextRecurringDate(
              new Date(),
              transaction.recurringInterval
            ),
          },
        });
      });
    });
  }
);

export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions",
    name: "Trigger Recurring Transactions",
    triggers: [{ cron: "0 0 * * *" }],
  },
  async ({ step }) => {
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },
              {
                nextRecurringDate: {
                  lte: new Date(),
                },
              },
            ],
          },
        });
      }
    );

    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: {
          transactionId: transaction.id,
          userId: transaction.userId,
        },
      }));

      await inngest.send(events);
    }

    return { triggered: recurringTransactions.length };
  }
);

async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: $${stats.totalIncome}
    - Total Expenses: $${stats.totalExpenses}
    - Net Income: $${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Completely replaced backticks with their hex code (\x60) so it never breaks copy-paste again
    const cleanedText = text.replace(new RegExp("\\x60\\x60\\x60(?:json)?\\n?", "g"), "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}

export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
    triggers: [{ cron: "0 0 1 * *" }],
  },
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({
        include: { accounts: true },
      });
    });

    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const stats = await getMonthlyStats(user.id, lastMonth);
        const monthName = lastMonth.toLocaleString("default", {
          month: "long",
        });

        const insights = await generateFinancialInsights(stats, monthName);

        await sendEmail({
          to: user.email,
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights,
            },
          }),
        });
      });
    }

    return { processed: users.length };
  }
);

export const checkBudgetAlerts = inngest.createFunction(
  {
    id: "check-budget-alerts",
    name: "Check Budget Alerts",
    triggers: [{ event: "transaction.created" }],
  },
  async ({ event, step }) => {
    const { userId, accountId } = event.data;

    await step.run("check-budget", async () => {
      const u = await db.user.findUnique({
        where: { id: userId },
        include: { budgets: true },
      });

      if (!u || !u.budgets || u.budgets.length === 0) return { status: "no-budget" };

      const b = u.budgets[0];

      const sd = new Date();
      sd.setDate(1);
      sd.setHours(0, 0, 0, 0);

      const exp = await db.transaction.aggregate({
        where: {
          userId,
          accountId,
          type: "EXPENSE",
          date: { gte: sd },
        },
        _sum: { amount: true },
      });

      const s = exp._sum.amount?.toNumber() || 0;
      const ba = b.amount.toNumber();
      const p = (s / ba) * 100;

      if (p < 80) return { status: "under-budget", p };

      const d = new Date().toDateString();
      const l = b.lastAlertSent ? new Date(b.lastAlertSent).toDateString() : null;

      if (l === d) return { status: "already-alerted", p };

      const acc = await db.account.findUnique({
        where: { id: accountId },
      });
      const an = acc?.name || "account";

      const res = await sendEmail({
        to: u.email,
        subject: p >= 100 ? "Limit Exceeded" : "Limit Warning",
        react: EmailTemplate({
          userName: u.name,
          type: "budget-alert",
          data: {
            percentageUsed: p,
            budgetAmount: ba,
            totalExpenses: s,
            accountName: an,
          },
        }),
      });

      if (res.success) {
        await db.budget.update({
          where: { id: b.id },
          data: { lastAlertSent: new Date() },
        });
      }

      return {
        status: p >= 100 ? "exceeded" : "warning",
        percentageUsed: p,
        emailSuccess: res.success,
      };
    });
  }
);

function isTransactionDue(transaction) {
  if (!transaction.lastProcessed) return true;

  const today = new Date();
  const nextDue = new Date(transaction.nextRecurringDate);

  return nextDue <= today;
}

function calculateNextRecurringDate(date, interval) {
  const next = new Date(date);
  switch (interval) {
    case "DAILY":
      next.setDate(next.getDate() + 1);
      break;
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      break;
    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      break;
    case "YEARLY":
      next.setFullYear(next.getFullYear() + 1);
      break;
  }
  return next;
}

async function getMonthlyStats(userId, month) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const dateFilter = {
    userId,
    date: {
      gte: startDate,
      lte: endDate,
    },
  };

  // Use Prisma groupBy + _sum for efficient server-side category aggregation
  const [expensesByCategory, incomeAggregate, expenseAggregate, transactionCount] =
    await Promise.all([
      db.transaction.groupBy({
        by: ["category"],
        where: {
          ...dateFilter,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      }),
      db.transaction.aggregate({
        where: {
          ...dateFilter,
          type: "INCOME",
        },
        _sum: {
          amount: true,
        },
      }),
      db.transaction.aggregate({
        where: {
          ...dateFilter,
          type: "EXPENSE",
        },
        _sum: {
          amount: true,
        },
      }),
      db.transaction.count({
        where: dateFilter,
      }),
    ]);

  // Build the byCategory map from groupBy results
  const byCategory = {};
  for (const group of expensesByCategory) {
    byCategory[group.category] = group._sum.amount?.toNumber() || 0;
  }

  return {
    totalExpenses: expenseAggregate._sum.amount?.toNumber() || 0,
    totalIncome: incomeAggregate._sum.amount?.toNumber() || 0,
    byCategory,
    transactionCount,
  };
}
