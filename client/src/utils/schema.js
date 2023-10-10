import * as z from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(2, { message: "Name must be at least 2 character(s)" }),
  email: z.string().min(2, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
});

export const loginSchema = z.object({
  email: z.string().min(2, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
});
