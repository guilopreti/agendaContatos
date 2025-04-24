import { IContatoRepository } from "@domain/repositories/IContatoRepository";
import { Contato } from "@domain/entities/Contato";

export class GetContatosByUserNameUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(userName: string): Promise<Contato[]> {
    return await this.contatoRepository.findByUserName(userName);
  }
}
