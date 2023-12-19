import { z } from "zod";
export const registerSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    age: z.string().min(0, "You have to be 18+ to create an account"),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassoword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterInterface = z.infer<typeof registerSchema>;
export type LoginInterface = z.infer<typeof loginSchema>;
