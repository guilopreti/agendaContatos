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
      ],
    );
    contato.id = result.insertId;
    return contato;
  }

  async findByUserName(name: string): Promise<Contato[]> {
    const [rows]: any = await this.pool.execute(
      `SELECT c.id, c.id_usuario, c.telefone_celular, c.telefone_recado, c.email, c.endereco
     FROM contatos c
     INNER JOIN users u ON u.id = c.id_usuario
     WHERE u.name = ?`,
      [name],
    );

    return rows.map(
      (row: any) =>
        new Contato(
          row.id_usuario,
          row.telefone_celular,
          row.telefone_recado,
          row.email,
          row.endereco,
        ),
    );
  }

  async deleteContatoByName(name: string): Promise<boolean | null> {
    try {
      const [result]: any = await this.pool.execute(
        `DELETE FROM contatos 
       WHERE id_usuario IN (
         SELECT id FROM users WHERE name = ?
       )`,
        [name],
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Erro ao deletar contato (${name}): ${error}`);
      throw new Error(`Erro ao deletar contato (${name}): ${error}`);
    }
  }
}
