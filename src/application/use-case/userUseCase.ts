import { UserCredentials } from "../../domain/entities/userCredentials";
import { UserRepository } from "../../domain/interface/userRepository";
import { UserValidator } from "../../domain/validators/userValidate";

export class UserCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(name: string, lastname: string, age: number, number: number, email: string, seat_number: string, schedule: number, origin: string, destination: string) {
        const newCredentials = new UserCredentials(
            name,
            lastname,
            age,
            number,
            email,
            seat_number,
            schedule,
            origin,
            destination
        );

        const userValidate = new UserValidator(newCredentials);
        await userValidate.invalidHasErrors();

        const user = await this.userRepository.registerUser(newCredentials);  // Asegúrate de que el método se llama `registerUser`

        if (!user) {
            this.invalidCredentialsThrow();
        }

        return user;
    }

    private invalidCredentialsThrow() {
        throw {
            http_status: 401,
            errors: [
                {
                    property: "credentials",
                    message: ["Invalid credentials"]
                }
            ]
        };
    }
}

export class UpdateUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async execute(id: number, updates: Partial<UserCredentials>) {
        const user = await this.userRepository.findUserById(id);

        if (!user) {
            return this.userNotFoundThrow();
        }

        const updatedUser = Object.assign(user, updates);
        const userValidate = new UserValidator(updatedUser);
        await userValidate.invalidHasErrors();

        const result = await this.userRepository.updateUser(updatedUser);
        if (!result) {
            return this.invalidUpdateThrow();
        }

        return result;
    }

    private userNotFoundThrow() {
        throw {
            http_status: 404,
            errors: [
                {
                    property: "user",
                    message: [
                        "User not found"
                    ]
                }
            ]
        };
    }

    private invalidUpdateThrow() {
        throw {
            http_status: 400,
            errors: [
                {
                    property: "update",
                    message: [
                        "Invalid update"
                    ]
                }
            ]
        };
    }
}

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async execute(id: number) {
        const existingUser = await this.userRepository.findUserById(id);

        if (!existingUser) {
            this.userNotFoundThrow();
        }

        const result = await this.userRepository.deleteUser(id);

        if (!result) {
            this.invalidDeletionThrow();
        }

        return result;
    }

    private userNotFoundThrow() {
        throw {
            http_status: 404,
            errors: [
                {
                    property: "user",
                    message: [
                        "User not found"
                    ]
                }
            ]
        };
    }

    private invalidDeletionThrow() {
        throw {
            http_status: 400,
            errors: [
                {
                    property: "deletion",
                    message: [
                        "Invalid deletion"
                    ]
                }
            ]
        };
    }
}

export class GetAllUsersUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async execute(): Promise<UserCredentials[]> {
        try {
            return await this.userRepository.getAllUsers();
        } catch (error) {
            console.error("Error retrieving all users:", error);
            return [];
        }
    }

}