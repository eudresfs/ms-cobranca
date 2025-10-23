import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters'),
  name: z
    .string()
    .min(1, 'Name must not be empty')
    .max(191, 'Name is too long')
    .optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
