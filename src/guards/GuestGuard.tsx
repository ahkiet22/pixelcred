'use client';

import { ReactNode, ReactElement, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/helpers/authStore';

interface GuestGuardProps {
  children: ReactNode;
  fallback?: ReactElement | null;
}

const GuestGuard = ({ children, fallback = null }: GuestGuardProps) => {
  const account = useAuthStore((state) => state.account);
  const loading = useAuthStore((state) => state.loading);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!loading && account) {
      // Nếu đã login, redirect sang home
      router.replace('/');
    }
  }, [account, loading, router]);

  if (loading || account) return fallback;

  return <>{children}</>;
};

export default GuestGuard;
