import { Contato } from "@domain/entities/Contato";

export interface IContatoRepository {
  save(contato: Contato): Promise<Contato>;
  findByUserName(name: string): Promise<Contato[]>;
}
