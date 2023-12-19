import db from "../../db";
import { Users } from "../../interfaces/users";

export function createUser(name: string, email: string, password: string): Promise<Users[]> {
    var user = db.func("insert_user", [name, email, password]);
    return user;
}   