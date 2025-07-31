import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const CLERK_API_BASE = "https://api.clerk.com/v1";
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

async function fetchClerk(path: string, options: RequestInit = {}) {
  if (!CLERK_SECRET_KEY) throw new Error("CLERK_SECRET_KEY not set");
  


  const res = await fetch(`${CLERK_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    
  }

  return res;
}


export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const me = await currentUser();
    if (!me || me.publicMetadata?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const res = await fetchClerk("/users");
    if (!res.ok)
      return NextResponse.json(
        { error: "Failed to fetch users from Clerk" },
        { status: 500 }
      );

    const data = await res.json();

    let users;
    if (Array.isArray(data)) {
      users = data;
    } else if (Array.isArray(data.data)) {
      users = data.data;
    } else {
      return NextResponse.json(
        { error: "Clerk response missing data array", raw: data },
        { status: 500 }
      );
    }

    function mapUser(user: any) {
      return {
        id: user.id,
        email: user.email_addresses?.[0]?.email_address || "",
        firstName: user.first_name || user.given_name || "",
        lastName: user.last_name || user.family_name || "",
        role: user.public_metadata?.role || "user",
        banned: user.banned || false,
        imageUrl: user.image_url || user.profile_image_url || "",
      };
    }

    return NextResponse.json({ users: users.map(mapUser) });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error", stack: e.stack },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const me = await currentUser();
    if (!me || me.publicMetadata?.role !== "admin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const { userId: targetId, action } = body;
    if (!targetId || !action)
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    let res;

    if (action === "setAdmin" || action === "setUser") {
      const role = action === "setAdmin" ? "admin" : "user";

      res = await fetchClerk(`/users/${targetId}`, {
        method: "PATCH",
        body: JSON.stringify({
          public_metadata: { role },
          private_metadata: { isAdmin: role === "admin" },
          unsafe_metadata: { role }, // اختیاری ولی برای داشبورد مفید
        }),
      });

    } else if (action === "ban") {
      res = await fetchClerk(`/users/${targetId}/ban`, { method: "POST" });

    } else if (action === "unban") {
      res = await fetchClerk(`/users/${targetId}/unban`, {
        method: "POST",
      });
    

    } else if (action === "delete") {
      res = await fetchClerk(`/users/${targetId}`, { method: "DELETE" });

    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    if (!res.ok) {
      const errorText = await res.text();
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // اگر json نیست نادیده بگیر
      }
      
      return NextResponse.json(
        { error: "Clerk API request failed", detail: errorJson || errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error", stack: e.stack },
      { status: 500 }
    );
  }
}