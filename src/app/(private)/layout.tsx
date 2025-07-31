import { clerkClient } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Sidebar from '@/components/menu/Sidebar';
async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;
  if (!isAdmin) redirect('/');
  return (
    <>
    <Sidebar/>
    <div className='p-14'>
      <Suspense fallback={<div className="w-full flex justify-center items-center min-h-[60vh]"><span className="text-lg font-bold animate-pulse">در حال بارگذاری...</span></div>}>
        {children}
      </Suspense>
    </div>
    </>
  );
}

export default layout;