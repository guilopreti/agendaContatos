export class Contato {
  id?: number;
  id_usuario: number;
  telefone_celular: string;
  telefone_recado?: string;
  email: string;
  endereco: string;

  constructor(
    id_usuario: number,
    telefone_celular: string,
    telefone_recado: string | undefined,
    email: string,
    endereco: string,
  ) {
    this.id_usuario = id_usuario;
    this.telefone_celular = telefone_celular;
    this.telefone_recado = telefone_recado;
    this.email = email;
    this.endereco = endereco;
  }
}
