'use client';

import AuthGuard from './AuthGuard';
import React, { ReactNode } from 'react';
import { Loading } from '@/components/Loading';
import GuestGuard from './GuestGuard';
import NoGuard from './NoGuard';

type GuardProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
};

const Guard = React.memo(({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Loading isLoading={true} message='' />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <NoGuard fallback={<Loading isLoading={true} message='' />}>{children}</NoGuard>;
  } else {
    return <AuthGuard fallback={<Loading isLoading={true} message='' />}>{children}</AuthGuard>;
  }
});

Guard.displayName = 'Guard';

export default Guard;