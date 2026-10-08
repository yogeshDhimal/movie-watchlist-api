

import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Please enter a valid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain at least a lowercase letter")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

export type RegisterUserData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

export type LoginUserData = z.infer<typeof loginSchema>;