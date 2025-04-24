import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { Database } from "@infrastructure/config/Database";
import { plainToClass, plainToInstance } from "class-transformer";
import { UserDTO } from "@presentation/dtos/UserDTO";

export class UserRepository implements IUserRepository {
    private pool = Database.getConnection();

    async findAll(): Promise<UserDTO[] | null> {
        try {
            const [result]: any = await this.pool.execute(
                "SELECT * FROM users"
            );

            return plainToInstance(UserDTO, result);

        } catch (error) {
            console.log(`Erro ao rucuperar registros no banco: ${error}`);
            throw new Error(`Erro ao rucuperar registros no banco: ${error}`);
        }
    }
    
    async save (user: User): Promise<User> {
        try {
            const [result]: any = await this.pool.execute(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [user.name, user.email]
            );

            user.id = result.insertId; 
            return user;

        } catch (error) {
            console.log(`Erro ao persistir o registro (${user.email}) no banco: ${error}`);
            throw new Error(`Erro ao persistir o registro (${user.email}) no banco: ${error}`);
        }
    }
    
    async findByEmail(email: string): Promise<User | null> {
        try {
            const [result]: any = await this.pool.execute(
                "SELECT * FROM users where email = ?", [email]
            );

            const users = result as User[];
            return users.length ? users[0] : null; 

        } catch (error) {
            console.log(`Erro ao recuperar o registro (${email}) no banco: ${error}`);
            throw new Error(`Erro ao recuperar o registro (${email}) no banco: ${error}`);
        }
    }

    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}