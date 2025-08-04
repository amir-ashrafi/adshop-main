'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="block sm:hidden p-2"
      title="برگشت"
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
}
