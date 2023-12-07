import { z } from "zod";

// Define the validation schema
export const registrationSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    // isAdmin: z.boolean().default(false),
});
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
});

const isValidFutureDate = (value: string) => {
    // Check if the date matches the format YYYY-MM-DD
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    if (!dateRegex.test(value)) {
        return false;
    }

    // Parse the input date string into a Date object
    const inputDate = new Date(value);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date is in the future
    return inputDate > currentDate;
};

export const eventSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters long",
    }),
    // date: z.string().refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
    //   message: 'Invalid date format. Use YYYY-MM-DD',
    // }),
    date: z.string().refine(isValidFutureDate, {
        message: "Use YYYY-MM-DD and provide a future date.",
    }),
    time: z.string().refine((value) => /\d{2}:\d{2}/.test(value), {
        message: "Invalid time format. Use HH:MM",
    }),
});
