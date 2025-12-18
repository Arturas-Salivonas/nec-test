import { z } from 'zod';
import { MIN_AGE } from './constants';

export const userSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Enter your full name')
    .max(100, 'Full name must be 100 characters or less')
    .refine((val) => val.trim().length > 0, 'Enter your full name'),

  age: z
    .number({
      message: 'Age must be a number',
    })
    .int('Age must be a whole number')
    .min(MIN_AGE, `You must be at least ${MIN_AGE} years old`)
    .max(120, 'Enter a valid age'),

  country: z
    .string()
    .min(1, 'Select a country'),

  interests: z
    .array(z.string())
    .min(1, 'Select at least one interest'),
});

export type UserSchemaType = z.infer<typeof userSchema>;
