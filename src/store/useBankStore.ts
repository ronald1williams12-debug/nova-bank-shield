import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Transaction, generateMockData, AccountType } from '../lib/mock-data-generator';
import { toast } from 'sonner';

interface BankState {
  users: User[];
  transactions: Transaction[];
  currentUser: User | null;
  initialized: boolean;
  
  // Auth Actions
  login: (email: string) => void;
  logout: () => void;
  
  // User Actions
  initializeData: () => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
  
  // Admin Actions
  approveKYC: (userId: string) => void;
  rejectKYC: (userId: string) => void;
  toggleFreeze: (userId: string) => void;
  adjustBalance: (userId: string, amount: number) => void;
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      users: [],
      transactions: [],
      currentUser: null,
      initialized: false,

      initializeData: () => {
        const state = get();
        if (state.initialized && state.users.length > 0) return;
        console.log('Initializing mock data...');
        const { users, transactions } = generateMockData();
        set({ users, transactions, initialized: true });
        console.log('Mock data initialized.');
      },

      login: (email: string) => {
        const user = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          set({ currentUser: user });
          toast.success(`Welcome back, ${user.firstName}!`);
        } else {
          toast.error('User not found. Use a mock email or admin@novatrust.com');
        }
      },

      logout: () => {
        set({ currentUser: null });
        toast.info('Logged out successfully');
      },

      updateUser: (userId, updates) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === userId ? { ...u, ...updates } : u)),
          currentUser: state.currentUser?.id === userId ? { ...state.currentUser, ...updates } : state.currentUser,
        }));
      },

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          status: 'Completed',
        };

        set((state) => {
          const updatedUsers = state.users.map((u) => {
            if (u.id === tx.userId) {
              const newBalance = tx.type === 'Credit' ? u.balance + tx.amount : u.balance - tx.amount;
              return { ...u, balance: newBalance };
            }
            return u;
          });

          return {
            transactions: [newTx, ...state.transactions],
            users: updatedUsers,
            currentUser: state.currentUser?.id === tx.userId 
              ? updatedUsers.find(u => u.id === tx.userId) || null
              : state.currentUser
          };
        });
      },

      approveKYC: (userId) => {
        get().updateUser(userId, { kycStatus: 'Approved' });
        toast.success('KYC Approved');
      },

      rejectKYC: (userId) => {
        get().updateUser(userId, { kycStatus: 'Rejected' });
        toast.error('KYC Rejected');
      },

      toggleFreeze: (userId) => {
        const user = get().users.find(u => u.id === userId);
        if (user) {
          get().updateUser(userId, { isFrozen: !user.isFrozen });
          toast.info(`Account ${!user.isFrozen ? 'Frozen' : 'Unfrozen'}`);
        }
      },

      adjustBalance: (userId, amount) => {
        const user = get().users.find(u => u.id === userId);
        if (user) {
          get().updateUser(userId, { balance: user.balance + amount });
          get().addTransaction({
            userId,
            type: amount > 0 ? 'Credit' : 'Debit',
            amount: Math.abs(amount),
            description: 'Admin Adjustment',
            category: 'Adjustment'
          });
          toast.success('Balance adjusted');
        }
      }
    }),
    {
      name: 'novatrust-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        initialized: state.initialized,
      }),
    }
  )
);
