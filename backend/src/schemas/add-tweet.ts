import z from "zod";

export const addTweetSchema = z.object({
    body: z.string({ message: "The body of the tweet is required" }),
    answer: z.string().optional()
})