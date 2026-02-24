// app/lib/schema.js
import { z } from "zod";

// ✅ Account schema
export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CURRENT", "SAVINGS"], {
    required_error: "Account type is required",
  }),
  balance: z.coerce.number().nonnegative("Balance must be 0 or greater"),
  isDefault: z.boolean().default(false),
});

// ✅ Transaction schema
export const transactionSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE"], {
      required_error: "Transaction type is required",
    }),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    description: z.string().optional(),
    date: z.coerce.date({
      required_error: "Date is required",
    }),
    accountId: z.string().min(1, "Account is required"),
    category: z.string().min(1, "Category is required"),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRecurring && !data.recurringInterval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring interval is required for recurring transactions",
        path: ["recurringInterval"],
      });
    }
  });
