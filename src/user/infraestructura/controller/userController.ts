import { Request, Response } from "express";
import { UserCase, UpdateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase } from "../../../application/use-case/userUseCase";
import { UserCredentials } from "../../domain/entities/userCredentials";

export class UserController {
    constructor(
        readonly userCase: UserCase,
        readonly updateUserUseCase: UpdateUserUseCase,
        readonly deleteUserUseCase: DeleteUserUseCase,
        readonly getAllUsersUseCase: GetAllUsersUseCase
    ) { }

    async registerUser(req: Request, res: Response) {
        try {
            const { name, lastname, age, number_telefonic, email, seat_number, schedule, origin, destination } = req.body;
            const registeredUser = await this.userCase.execute(name, lastname, age, number_telefonic, email, seat_number, schedule, origin, destination);

            res.status(200).json({
                message: "Pasajero/a registrado correctamente",
                success: true,
                newUser: registeredUser
            });
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            res.status(500).json({
                message: "Error al ingresar Pasajero/a",
                success: false,
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updates: Partial<UserCredentials> = req.body;
            const updatedUser = await this.updateUserUseCase.execute(Number(id), updates);

            res.status(200).json({
                message: "Pasajero/a actualizado correctamente",
                success: true,
                updatedUser
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar Pasajero/a",
                success: false
            });
            console.error(error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.deleteUserUseCase.execute(Number(id));

            res.status(200).json({
                message: "Pasajero/a eliminado correctamente",
                success: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar Pasajero/a",
                success: false
            });
            console.error(error);
        }
    }

    async getUserByID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userCase.userRepository.findUserById(Number(id));
            if (!user) {
                return res.status(404).json({
                    message: "Pasajero/a no encontrado",
                    success: false
                });
            }
            res.status(200).json({
                message: "Pasajero/a encontrado",
                success: true,
                user
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener Pasajero/a",
                success: false
            });
            console.error(error);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await this.getAllUsersUseCase.execute();
            res.status(200).json({
                message: "Usuarios obtenidos correctamente",
                success: true,
                users: [allUsers]
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener usuarios",
                success: false
            });
            console.error(error);
        }
    }
}