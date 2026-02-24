import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";
import AnimatedTransactionPage from "./AnimatedTransactionPage";

export default async function AddTransactionPage({ searchParams }) {
  const params = await searchParams;
  const accounts = await getUserAccounts();
  const editId = params?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <AnimatedTransactionPage
      accounts={accounts}
      categories={defaultCategories}
      editMode={!!editId}
      initialData={initialData}
    />
  );
}
