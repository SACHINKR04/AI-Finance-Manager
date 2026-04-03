"use client";

import { ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount, deleteAccount } from "@/actions/account";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deletedResult,
    error: deleteError,
  } = useFetch(deleteAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  useEffect(() => {
    if (deletedResult?.success) {
      toast.success("Account deleted successfully");
    }
  }, [deletedResult]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError.message || "Failed to delete account");
      setIsDeleting(false);
    }
  }, [deleteError]);

  const handleDelete = async (event) => {
    event.preventDefault();
    await deleteFn(id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {!isDefault && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleting((prev) => !prev);
                }}
                className="h-6 w-6 text-muted-foreground hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading || isDeleting}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isDeleting ? (
            <div
              className="flex flex-col gap-2 mt-2"
              onClick={(e) => e.preventDefault()}
            >
              <p className="text-sm text-red-500 font-medium">
                Are you sure you want to delete?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Yes"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleting(false)}
                  disabled={deleteLoading}
                >
                  No
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
