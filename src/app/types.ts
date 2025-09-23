import { z, type ZodType } from "zod";

export type FormData = {
  name: string;
  email: string;
};

export const UserSchema: ZodType<FormData> = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});
