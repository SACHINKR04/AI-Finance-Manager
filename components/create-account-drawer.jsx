"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema"; // ✅ fixed import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/account";

export function CreateAccountDrawer({ open, onClose }) {
  const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: zodResolver(accountSchema),   // ✅ use directly
  defaultValues: {
    name: "",
    type: "CURRENT",
    balance: 0,
    isDefault: false,
  },
});

  const { loading, error, fn: createAccountFn } = useFetch(createAccount);

  const onSubmit = async (data) => {
    const res = await createAccountFn(data);
    if (res?.success) {
      reset(); // clear form
      onClose?.(); // close drawer safely
    } else {
      const errMsg = res?.error || "Unknown error (no response from server)";
      console.error("Failed to create account:", errMsg, res);
      alert("Failed to create account: " + errMsg);
    }
  };

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Account</DrawerTitle>
          <DrawerDescription>
            Fill in details to create a new account
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Account Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Account Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input id="name" placeholder="e.g., Main Checking" {...field} />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Account Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">Current</SelectItem>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Initial Balance */}
          <div className="space-y-2">
            <label htmlFor="balance" className="text-sm font-medium">
              Initial Balance
            </label>
            <Controller
              name="balance"
              control={control}
              render={({ field }) => (
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              )}
            />
            {errors.balance && (
              <p className="text-sm text-red-500">{errors.balance.message}</p>
            )}
          </div>

          {/* Default Account Switch */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Set as default account</span>
            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <DrawerFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>

          {error && <p className="text-sm text-red-500">{error?.message || error || "Unknown error"}</p>}
        </form>
      </DrawerContent>
    </Drawer>
  );
}
