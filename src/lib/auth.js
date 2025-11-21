import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

export const verifyToken = async (req) => {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) { throw new Error("Unauthorized") }

    const token = authHeader.split(" ")[1]
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (err) {
        throw new Error("Unauthorized or user doesn't have access")
    }
}