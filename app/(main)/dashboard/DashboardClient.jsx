"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default function DashboardClient({ accounts = [], transactions = [], budgetData = null }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />

        <DashboardOverview accounts={accounts} transactions={transactions || []} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
            accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
