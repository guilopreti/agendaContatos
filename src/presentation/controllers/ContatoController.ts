import { Request, Response } from "express";
import { ContatoRepository } from "@infrastructure/repositories/ContatoRepository";
import { CreateContatoUseCase } from "@application/useCases/CreateContatoUseCase";
import { GetContatosByUserNameUseCase } from "@application/useCases/GetContatosByUserNameUseCase";
import { Contato } from "@domain/entities/Contato";

export class ContatoController {
  private createContatoUseCase: CreateContatoUseCase;
  private getContatosByUserNameUseCase: GetContatosByUserNameUseCase;

  constructor() {
    const repo = new ContatoRepository();
    this.createContatoUseCase = new CreateContatoUseCase(repo);
    this.getContatosByUserNameUseCase = new GetContatosByUserNameUseCase(repo);
  }

  async create(req: Request, res: Response) {
    try {
      const contato = await this.createContatoUseCase.execute(req.body);
      return res.status(201).json(contato);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getByUserName(req: Request, res: Response) {
    try {
      const contatos = await this.getContatosByUserNameUseCase.execute(
        req.params.name
      );
      if (!contatos || contatos.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum contato encontrado para esse usuário." });
      }
      return res.status(200).json(contatos);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
