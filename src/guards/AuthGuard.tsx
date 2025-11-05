"use client";

import { ReactNode, ReactElement, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/helpers/authStore";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const account = useAuthStore((state) => state.account);
  const loading = useAuthStore((state) => state.loading);
  const logout = useAuthStore((state) => state.logout);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!account) {
        logout();
        router.replace("/" + (pathName ? `?returnUrl=${pathName}` : ""));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [account, loading, logout, router, pathName]);

  if (loading || !account) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
