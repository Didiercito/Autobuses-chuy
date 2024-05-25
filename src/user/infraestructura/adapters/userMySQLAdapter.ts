import { UserCredentials } from "../../domain/entities/userCredentials";
import { UserRepository } from "../../domain/interface/userRepository";
import { AppDataSource } from "../../../database/db";

export class UserMySQLAdapterRepository implements UserRepository {
    async registerUser(credentials: UserCredentials): Promise<UserCredentials | null> {
        try {
            const result = await AppDataSource.query(
                'INSERT INTO users (name, lastname, age, number_telefonic, email, seat_number, schedule, origin, destination) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    credentials.name, credentials.lastname, credentials.age,
                    credentials.number_telefonic, credentials.email,
                    credentials.seat_number, credentials.schedule,
                    credentials.origin, credentials.destination
                ]
            );

            const insertId = result.insertId;
            if (insertId) {
                credentials.id = insertId;
                return credentials;
            }
            return null;
        } catch (error) {
            console.error("Error registering user:", error);
            return null;
        }
    }

    async findUserById(id: number): Promise<UserCredentials | null> {
        try {
            const [rows] = await AppDataSource.query(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );
            if (rows.length > 0) {
                return rows[0] as UserCredentials;
            }
            return null;
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
        }
    }

    async updateUser(user: UserCredentials): Promise<UserCredentials | null> {
        try {
            await AppDataSource.query(
                'UPDATE users SET name = ?, lastname = ?, age = ?, number_telefonic = ?, email = ?, seat_number = ?, schedule = ?, origin = ?, destination = ? WHERE id = ?',
                [
                    user.name, user.lastname, user.age, user.number_telefonic,
                    user.email, user.seat_number, user.schedule, user.origin,
                    user.destination, user.id
                ]
            );
            return await this.findUserById(user.id!);
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const [result] = await AppDataSource.query(
                'DELETE FROM users WHERE id = ?',
                [id]
            );
            return result.affectedRows !== 0;
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    }

    async getAllUsers(): Promise<UserCredentials[]> {
        try {
            const [rows] = await AppDataSource.query('SELECT * FROM users');
            return rows as UserCredentials[];
        } catch (error) {
            console.error("Error retrieving all users:", error);
            return [];
        }
    }
}