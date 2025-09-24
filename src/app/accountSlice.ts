import { createSlice, nanoid } from "@reduxjs/toolkit";
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
  isLoggedIn?: boolean;
  loginError?: string;
}

const initialState: AccountState = {
  accounts: Accounts,
  isLoggedIn: false,
  loginError: undefined,
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    toggleAccountStatus: (state, action) => {
      const account = state.accounts.find(
        (acc) => acc.id === action.payload.id,
      );
      if (account) {
        account.status = !account.status;
      }
    },
    deleteAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload.id,
      );
    },
    login: (state, action) => {
      const { name, email } = action.payload;
      const user = state.accounts.find((acc) => acc.name === name);
      if (!user) {
        state.loginError = "Tài khoản không tồn tại";
      } else if (user.email !== email) {
        state.loginError = "Email không đúng";
      } else if (!user.status) {
        state.loginError = "Tài khoản chưa được kích hoạt";
      } else {
        state.isLoggedIn = true;
        state.loginError = undefined;
      }
    },
    addAccount: (state, action) => {
      const { name, email } = action.payload;
      const newAccount: AccountOptions = {
        id: nanoid(),
        name,
        email,
        updatedAt: new Date().toLocaleDateString(),
        status: false,
      };
      state.accounts.push(newAccount);
    },
    editAccount: (state, action) => {
      const { id, data } = action.payload;
      const { name, email } = data;
      const account = state.accounts.find((acc) => acc.id === id);
      if (account) {
        account.name = name;
        account.email = email;
        account.updatedAt = new Date().toLocaleDateString();
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  toggleAccountStatus,
  deleteAccount,
  login,
  addAccount,
  editAccount,
} = AccountSlice.actions;
export default AccountSlice.reducer;
