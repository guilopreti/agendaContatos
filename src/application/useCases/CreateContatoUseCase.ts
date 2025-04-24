import { IContatoRepository } from "@domain/repositories/IContatoRepository";
import { Contato } from "@domain/entities/Contato";

export class CreateContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(contatoData: Contato): Promise<Contato> {
    return await this.contatoRepository.save(contatoData);
  }
}
