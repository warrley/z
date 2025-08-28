import z from "zod";

export const signinSchema = z.object({
    email: z.email({ message: "Invalid e-mail" }),
    password: z.string({ message: "Password is required" }).min(4, "Password must have at least 4 caracters")
});