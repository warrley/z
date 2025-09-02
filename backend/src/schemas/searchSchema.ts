import z from "zod";

export const searchSchema = z.object({
    q: z.string({ message: "Fill the search" }).min(3, "Minmum of 3 caracters")
});