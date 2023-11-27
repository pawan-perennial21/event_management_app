import { z } from 'zod';

// Define the validation schema
export const registrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  // isAdmin: z.boolean().default(false),
});
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});


export const eventSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  location: z.string().min(2, { message: 'Location must be at least 2 characters long' }),
  date: z.string().refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
    message: 'Invalid date format. Use YYYY-MM-DD',
  }),
  time: z.string().refine((value) => /\d{2}:\d{2}/.test(value), {
    message: 'Invalid time format. Use HH:MM',
  }),
});