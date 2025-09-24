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

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu không khớp",
  });

export const LoginSchema: ZodType<LoginFormData> = z.object({
  name: nameSchema,
  password: passwordSchema,
});
