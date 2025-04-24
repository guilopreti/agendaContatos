import { Request, Response } from 'express';
import { CreateUserUseCase } from '@application/useCases/CreateUserUseCase';
import { GetAllUsersUseCase } from '@application/useCases/GetAllUsersUseCase';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { GetUserByEmailUseCase } from '@application/useCases/GetUserByEmailUseCase';
import { UserDTO } from '@presentation/dtos/UserDTO';

export class UserController {
    private createUserUseCase: CreateUserUseCase;
    private getAllUsersUseCase: GetAllUsersUseCase;
    private getUserByEmailUseCase: GetUserByEmailUseCase;
    
    constructor() {
        const userRepository = new UserRepository;
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
        this.getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { name, email } = req.body;
            const user = await this.createUserUseCase.execute(name, email);
            
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({error: (error as Error).message })
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users: UserDTO[] = await this.getAllUsersUseCase.execute();
            
            if(!users || users.length === 0) {
                return res.status(404).json({message: "Nenhum usuário encontrado!"});
            }

            return res.status(200).json(users);

        } catch (error) {
            return res.status(400).json({error: (error as Error).message })
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const user: UserDTO | null = await this.getUserByEmailUseCase.execute(req.params.email);

            if(!user) {
                return res.status(404).json({message: "Usuário não encontrado!"});
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(400).json({error: (error as Error).message })
        }
    }
}
