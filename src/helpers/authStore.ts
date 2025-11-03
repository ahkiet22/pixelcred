import { create } from "zustand";
import type { WalletAccount } from "@mysten/wallet-standard";

interface AuthState {
  account: WalletAccount | null;
  loading: boolean;
  setAccount: (account: WalletAccount | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  account: null,
  loading: true,
  setAccount: (account) => set({ account, loading: false }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ account: null }),
}));
