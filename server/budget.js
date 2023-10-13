import { query } from "../db.js";

export const getUserId = async (userName) => {
    try {
        const userId = await query("SELECT id FROM users WHERE user_name = $1", [userName]);
        return userId;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};




