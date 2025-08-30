import z from "zod";

export const signupSchema = z.object({
    name: z.string({ message: "Name is required" }).min(2, "Name must have at least 2 caracters"),
    email: z.email({ message: "Invalid e-mail" }),
    password: z.string({ message: "Password is required" }).min(4, "Password must have at least 4 caracters")
});