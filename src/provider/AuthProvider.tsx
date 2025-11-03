import { useAuthStore } from '@/helpers/authStore';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect } from 'react';

export const AuthProvider = () => {
  const account = useCurrentAccount();
  const setAccount = useAuthStore((state) => state.setAccount);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    if (account) {
      setAccount(account);
    } else {
      setAccount(null);
    }
  }, [account, setAccount, setLoading]);

  return null;
};
