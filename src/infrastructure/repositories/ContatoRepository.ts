import { IContatoRepository } from "@domain/repositories/IContatoRepository";
import { Contato } from "@domain/entities/Contato";
import { Database } from "@infrastructure/config/Database";

export class ContatoRepository implements IContatoRepository {
  private pool = Database.getConnection();

  async save(contato: Contato): Promise<Contato> {
    const [result]: any = await this.pool.execute(
      `INSERT INTO contatos 
             (id_usuario, telefone_celular, telefone_recado, email, endereco) 
             VALUES (?, ?, ?, ?, ?)`,
      [
        contato.id_usuario,
        contato.telefone_celular,
        contato.telefone_recado ?? null,
        contato.email,
        contato.endereco,
      ]
    );
    contato.id = result.insertId;
    return contato;
  }

  async findByUserName(name: string): Promise<Contato[]> {
    const [result]: any = await this.pool.execute(
      `SELECT c.* FROM contatos c
             INNER JOIN users u ON u.id = c.id_usuario
             WHERE u.name = ?`,
      [name]
    );
    return result;
  }
}
