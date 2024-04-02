import db from "../../db";
import { Users } from "../../interfaces/users";

export async function getbyId(id_user: number): Promise<Users[]> {
    // Verificar si id_user es un número válido
    console.log(id_user);
    if (isNaN(id_user)) {
        throw new Error("El valor de id_user no es un número válido.");
    }

    try {
        const result = await db.func("get_user_by_id", id_user);
        return result;
    } catch (error) {
        // Manejar el error según tus necesidades
        console.error("Error en la consulta get_user_by_id:", error);
        throw error;
    }
}
