'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import AdminMenu from './AdminMenu';

interface Props {
  isAdmin: boolean;
}

const ClientAuth = ({ isAdmin }: Props) => {
  return (
    <div className="border-2 border-white border-b-slate-500 rounded-md hover:border-white duration-500 px-3 py-2 hover:bg-black hover:text-white h-12">
      <SignedIn>
        {isAdmin ? <AdminMenu /> : <UserButton />}
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default ClientAuth;
