import db from "../../db";
import { Users } from "../../interfaces/users";

export async function getuseremail(email: string): Promise<Users[]> {
    try {
        const result = await db.func("get_user_by_email", email);
        return result;
    } catch (error) {
        throw error;
    }
}
