import { UserCredentials } from "../entities/userCredentials";

export interface UserRepository {
    registerUser(credentials: UserCredentials): Promise<UserCredentials | null>;
    findUserById(id: number): Promise<UserCredentials | null>;
    updateUser(user: UserCredentials): Promise<UserCredentials | null>;
    deleteUser(id: number): Promise<boolean>;
    getAllUsers(): Promise<UserCredentials[]>;
}