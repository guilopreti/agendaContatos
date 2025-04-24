import { IUserRepository } from "@domain/repositories/IUserRepository";
import { UserDTO } from "@presentation/dtos/UserDTO";

export class GetUserByEmailUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string): Promise<UserDTO | null> {
        if (!email) {
            throw new Error("Email is required");
        }
        return await this.userRepository.findByEmail(email) ?? null;
    }
}