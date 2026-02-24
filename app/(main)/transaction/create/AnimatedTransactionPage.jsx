"use client";
import { AnimatePresence, motion } from "framer-motion";
import { AddTransactionForm } from "../_components/transaction-form";

export default function AnimatedTransactionPage({ accounts, categories, editMode, initialData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="max-w-3xl mx-auto px-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center md:justify-normal mb-8">
          <h1 className="text-5xl gradient-title ">Add Transaction</h1>
        </div>
        <AddTransactionForm
          accounts={accounts}
          categories={categories}
          editMode={editMode}
          initialData={initialData}
        />
      </motion.div>
    </AnimatePresence>
  );
}
