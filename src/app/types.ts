import { z, type ZodType } from "zod";

export type FormData = {
  name: string;
  email: string;
};

export const UserSchema: ZodType<FormData> = z.object({
  name: z
    .string()
    .min(1, "Tên người dùng không hợp lệ")
    .regex(/^[\p{L}\s]+$/u, "Tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z.email("Địa chỉ email không hợp lệ"),
});
