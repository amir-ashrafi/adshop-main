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
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<string | null>(null); // پیام موفقیت یا خطا

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`/api/users`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(`❌ خطا: ${result.error || "خطای ناشناخته"}`);
        return;
      }

      // بروزرسانی لیست
      setUsers((prev) =>
        prev
          .map((u) =>
            u.id === userId
              ? {
                  ...u,
                  role: action === "setAdmin" ? "admin" : action === "setUser" ? "user" : u.role,
                  banned: action === "ban" ? true : action === "unban" ? false : u.banned,
                }
              : u
          )
          .filter((u) => !(action === "delete" && u.id === userId))
      );

      // پیام موفقیت برای تغییر نقش
      if (action === "setAdmin" || action === "setUser") {
        setMessage("✅ نقش کاربر با موفقیت تغییر یافت");
      } else if (action === "ban") {
        setMessage("🚫 کاربر بن شد");
      } else if (action === "unban") {
        setMessage("✅ بن کاربر برداشته شد");
      } else if (action === "delete") {
        setMessage("🗑 کاربر حذف شد");
      }

      // حذف پیام بعد از 3 ثانیه
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error("Error performing action:", err);
      setMessage("❌ مشکلی پیش آمده است");
      setTimeout(() => setMessage(null), 3000);
    }
  }

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-bold flex w-full justify-center">مدیریت کاربران</h1>

      {/* نمایش پیام */}

      {message && (
        <div className="bg-green-100 absolute right-20 top-20 text-green-800 px-4 py-2 rounded-lg shadow-md text-center">
          {message}
        </div>
      )}
      {/* ورودی جستجو */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="جستجوی کاربر..."
          className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-right shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          dir="rtl"
        />
      </div>

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
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-500">کاربری یافت نشد.</p>
      ) : (
        <div className="grid gap-4">
          {filteredUsers.map(({ id, email, firstName, lastName, role, banned }) => (
            <Card
              key={id}
              className="flex flex-col bg-slate-100 sm:flex-row items-center justify-between px-4 py-2"
            >
              <div className="flex flex-col space-y-0">
                <p>
                  <span className="text-xs pr-4"> نقش: {role === "admin" ? "ادمین" : "کاربر"}</span>||
                  <span className="text-black pl-4">
                    {firstName} {lastName}
                  </span>
                </p>
                <span className="font-semibold text-slate-500">{email}</span>
                <span className="text-sm text-gray-500">
                  {banned && <span className="ml-2 text-red-500">(بن شده)</span>}
                </span>
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

                <Button variant="destructive" onClick={() => handleUserAction(id, "delete")}>
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
