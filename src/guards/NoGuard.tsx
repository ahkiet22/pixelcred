"use client";

import { useAuthStore } from "@/helpers/authStore";
import { ReactElement, ReactNode } from "react";

interface NoGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const NoGuard = ({ children, fallback }: NoGuardProps) => {
  const { loading } = useAuthStore();

  if (loading) {
    return fallback;
  }

  return <>{children}</>;
};

export default NoGuard;
