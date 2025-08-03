'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ClerkUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  banned: boolean;
};


export default function UsersPage() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/users`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleUserAction(userId: string, action: string) {
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, action }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`خطا: ${result.error || "خطای ناشناخته"}`);
        return;
      }

      // Refresh user list after update
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                role: action === "setAdmin" ? "admin" : action === "setUser" ? "user" : u.role,
                banned:
                  action === "ban"
                    ? true
                    : action === "unban"
                    ? false
                    : u.banned,
              }
            : u
        ).filter((u) => !(action === "delete" && u.id === userId))
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error performing action:", err);
      alert("مشکلی پیش آمده است");
    }
  }

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-bold flex w-full justify-center">مدیریت کاربران</h1>

      {loading ? (
  <div className="grid gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </Card>
    ))}
  </div>
) : users.length === 0 ? (
  <p className="text-gray-500">کاربری یافت نشد.</p>
) : (
        <div className="grid gap-4">
          {users.map(({ id, email, firstName, lastName, role, banned }) => (
            <Card key={id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{email}</p>
                <p className="text-sm text-gray-500">
                  {firstName} {lastName} | نقش: {role}
                  {banned && <span className="ml-2 text-red-500">(بن شده)</span>}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleUserAction(id, role === "admin" ? "setUser" : "setAdmin")
                  }
                >
                  {role === "admin" ? "حذف ادمین" : "ادمین کن"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleUserAction(id, banned ? "unban" : "ban")}
                >
                  {banned ? "رفع بن" : "بن کن"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleUserAction(id, "delete")}
                >
                  حذف
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
