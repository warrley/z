import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET_KEY || "my-key";

export const generatedToken = async (userSlug: string) => {
    return await jwt.sign({ userSlug }, JWT_KEY, { expiresIn: "1h" });
};

export const verifyToken = async (token: string) => {
    try{
        const payload = jwt.verify(token, JWT_KEY);
        return { valid: true, payload };
    } catch (err) {
        return { valid: false, payload: null }
    }
};