import { UserCase,UpdateUserUseCase,DeleteUserUseCase,GetAllUsersUseCase } from "../../application/use-case/userUseCase";
import { UserMySQLAdapterRepository } from "./adapters/userMySQLAdapter";
import { UserController } from "./controller/userController";


const userMySQLAdapter = new UserMySQLAdapterRepository();
const userCase = new UserCase(userMySQLAdapter);
const getAllUsersUseCase = new GetAllUsersUseCase(userMySQLAdapter);
const updateUserCase = new UpdateUserUseCase(userMySQLAdapter);
const deleteUserCase = new DeleteUserUseCase(userMySQLAdapter);
export const userController = new UserController(userCase, updateUserCase, deleteUserCase, getAllUsersUseCase);