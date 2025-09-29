import { z, type ZodType } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
  .regex(/\d/, "Mật khẩu phải có ít nhất một chữ số")
  .regex(/[^\w]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt");

const nameSchema = z
  .string()
  .min(1, "Tên người dùng không hợp lệ")
  .regex(/^[\p{L}\s]+$/u, "Tên chỉ được chứa chữ cái và khoảng trắng");

const emailSchema = z.email("Địa chỉ email không hợp lệ");

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormData = {
  name: string;
  password: string;
};

export type EditFormData = {
  name: string;
  email: string;
  password: string;
  newPassword: string;
};

export const RegisterSchema = (existingEmails: string[]) => {
  return z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      passwordConfirm: passwordSchema,
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Mật khẩu không khớp",
      path: ["passwordConfirm"],
    })
    .refine((data) => !existingEmails.includes(data.email), {
      message: "Email đã được đăng ký",
      path: ["email"],
    });
};

export const LoginSchema: ZodType<LoginFormData> = z.object({
  name: nameSchema,
  password: passwordSchema,
});

export const EditSchema = (currentEmails: string[]) => {
  return z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      newPassword: passwordSchema,
    })
    .refine((data) => data.password !== data.newPassword, {
      message: "Mật khẩu mới phải khác mật khẩu cũ",
      path: ["newPassword"],
    })
    .refine((data) => !currentEmails.includes(data.email), {
      message: "Email đã được sử dụng",
      path: ["email"],
    });
};

export type ItemFields = {
  name: string;
  price: number;
  stock: number;
  tags: string[];
}
