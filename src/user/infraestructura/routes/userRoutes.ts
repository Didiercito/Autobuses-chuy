import express, { Router } from "express";
import { userController } from "../dependencies";

export const userRoutes: Router = express.Router();

userRoutes.post('/registrar', userController.registerUser.bind(userController));
userRoutes.put('/editar/:id', userController.updateUser.bind(userController));
userRoutes.delete('/eliminar/:id', userController.deleteUser.bind(userController));
userRoutes.get('/todos', userController.getAllUsers.bind(userController));
userRoutes.get('/:id', userController.getUserByID.bind(userController));