import type { Metadata } from 'next';
import './globals.css';
import { MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import '../app/font/font.css'
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import Auth from '@/components/auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import CartDropdown from '@/components/cart';
import { faIR } from '@clerk/localizations'
import BackButton from '@/components/back';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'ADShop',
  description: 'Ashrafi Digital Shop to buy digital stuff',
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
        <html lang="en" >
          
          <body
            className={` font-vazir antialiased leading-8 overflow-x-hidden w-full`}
          >
            <main className="flex flex-col min-h-screen ">
              <header className="fixed flex justify-between items-center shadow-xl bg-white px-8 w-full h-20 z-40">
                <div className="flex items-center gap-2">
                  <BackButton />
                  <CartDropdown />
                  <Auth />
                </div>
                <div className="flex items-center gap-3 h-12">
                  <Link href="/" className="font-bold text-2xl ">
                    اِی‌دی‌شاپ
                  </Link>
                  <MonitorSmartphone />
                </div>
              </header>
              
              <div className="relative mt-10 ">
              <ScrollToTop/>
                {children}
                <Toaster />
              </div>
              
              <footer className="bg-blue-600/40 font-bold fixed w-full bottom-0 left-0 text-white flex items-center justify-center h-auto sm:h-10">
                <p className='text-xs sm:text-sm md:text-base text-right text-white p-3'>
                تمامی حقوق مادی و معنوی این سایت متعلق به امیررضا اشرفی می‌باشد.
                </p>
              </footer>
            </main>
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
