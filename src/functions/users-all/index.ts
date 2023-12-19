import db from "../../db";
import { Users } from "../../interfaces/users";

export function getAllUsers(): Promise<Users[]> {
    var getAllUser = db.func("get_all_users");
    return getAllUser;
}