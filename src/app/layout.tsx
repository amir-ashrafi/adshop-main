import type { Metadata } from 'next';
import './globals.css';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import Auth from '@/components/auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import CartDropdown from '@/components/cart';
import samimFont from '@/app/samimFont';
import { faIR } from '@clerk/localizations'
export const metadata: Metadata = {
  title: 'AshrafiTech',
  description: 'AshrafiTech to buy digital stuff',
};

export interface RootLayoutProps {
  children: React.ReactNode;
  ads?: React.ReactNode;
}

export default function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <ClerkProvider
      localization={faIR}
      appearance={{
        elements: {
          headerTitle: {
            color: '#f00',
          },
          formButtonPrimary: {
            fontSize: 16,
            
          },
        },
      }}
    >
      <ReactQueryProvider>
        <html lang="en">
          <body
            className={` ${samimFont.variable} font-samim antialiased leading-8 overflow-x-hidden`}
          >
            <main className="flex flex-col min-h-screen ">
              <header className="fixed flex justify-between items-center shadow-xl bg-white px-8 w-full h-20 z-40">
                <div className="flex items-center gap-2">
                  <CartDropdown />
                  <Auth />
                </div>
                <div className="flex items-center gap-3 h-12">
                  <Link href="/" className="font-bold text-2xl ">
                    اشرفی‌تک
                  </Link>
                  <MonitorSmartphone />
                </div>
              </header>
              
              <div className="relative mt-10 ">
                {children}
                <Toaster />
              </div>
              
              <footer className="bg-blue-600/40 font-bold fixed w-full bottom-0 left-0 text-white flex items-center justify-center h-10">
                <p>
                تمامی حقوق مادی و معنوی این سایت متعلق به امیررضا اشرفی می‌باشد.</p>
              </footer>
            </main>
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
