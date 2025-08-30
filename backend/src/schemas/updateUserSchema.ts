import z from "zod";

export const userUpdateSchema = z.object({
    name: z.string().min(2, "Name must have at least 2 caracters").optional(),
    bio: z.string().optional(),
    link: z.string().url("Must be a valid url").optional()
});