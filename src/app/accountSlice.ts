import { createSlice } from "@reduxjs/toolkit";

export interface AccountOptions {
  id: string;
  name: string;
  updatedAt: string;
  email: string;
  status: boolean;
}

const Accounts: AccountOptions[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    updatedAt: "08/07/2022",
    status: true,
  },
  {
    id: "2",
    name: "Nguyễn Văn B",
    email: "nguyenvanb@example.com",
    updatedAt: "08/08/2022",
    status: true,
  },
  {
    id: "3",
    name: "Nguyễn Văn C",
    email: "nguyenvanc@example.com",
    updatedAt: "08/09/2022",
    status: false,
  },
];

export interface AccountState {
  accounts: AccountOptions[];
}

const initialState: AccountState = {
  accounts: Accounts,
};

const AccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
      toggleAccountStatus: (state, action) => {
        const account = state.accounts.find(acc => acc.id === action.payload.id);
        if (account) {
          account.status = !account.status;
        }
      },
      deleteAccount: (state, action) => {
        state.accounts = state.accounts.filter(acc => acc.id !== action.payload.id);
      },
    }
})

export const { toggleAccountStatus, deleteAccount } = AccountSlice.actions;
export default AccountSlice.reducer;