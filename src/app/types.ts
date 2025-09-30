export type ItemFields = {
  name: string;
  price: number;
  stock: number;
  tags: string[];
};

export type RegisterFields = {
  name: string;
  email: string;
  password: string;
  passwordCfm: string;
};

export type EditFields = {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  newPasswordCfm: string;
};

export type LoginFields = {
  name: string;
  password: string;
};

export type InfoFields = {
  id: string;
  name: string;
  email: string;
  password: string;
  updatedAt: string;
  status: boolean;
};
