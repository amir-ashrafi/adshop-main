// components/auth/Auth.tsx
import { currentUser } from "@clerk/nextjs/server";
import ClientAuth from "./ClientAuth";

export default async function Auth() {
  const user = await currentUser();

  const isAdmin = user?.privateMetadata?.isAdmin === true;

  return <ClientAuth isAdmin={isAdmin} />;
}
