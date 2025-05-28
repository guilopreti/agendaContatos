import { Database } from "@infrastructure/config/Database";
import { ContatoRepository } from "@infrastructure/repositories/ContatoRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { Contato } from "@domain/entities/Contato";
import { User } from "@domain/entities/User";

describe("ContatoController - Fluxos principais", () => {
  let contatoRepository: ContatoRepository;
  let userRepository: UserRepository;
  let testUser: User;
  let testContato: Contato;

  beforeAll(async () => {
    await Database.init();
    contatoRepository = new ContatoRepository();
    userRepository = new UserRepository();

    // Criar um usuário de teste
    testUser = new User("Usuário Teste", "usuario@teste.com");
    testUser = await userRepository.save(testUser);
  });

  afterAll(async () => {
    // Remove o usuário de teste no final de tudo
    await userRepository.deleteById(testUser.id!);
    await Database.close();
  });

  it("deve criar um contato para o usuário", async () => {
    testContato = new Contato(
      testUser.id!,
      "999999999",
      "222222222",
      "contato@teste.com",
      "Rua de Teste, 123",
    );

    const contatoCriado = await contatoRepository.save(testContato);

    expect(contatoCriado).toHaveProperty("id");
    expect(contatoCriado.email).toBe("contato@teste.com");
    expect(contatoCriado.id_usuario).toBe(testUser.id);
  });

  it("deve retornar os contatos do usuário pelo nome", async () => {
    const contatos = await contatoRepository.findByUserName(testUser.name);

    expect(Array.isArray(contatos)).toBe(true);
    expect(contatos.length).toBeGreaterThan(0);

    const contato = contatos.find((c) => c.email === "contato@teste.com");
    expect(contato).toBeDefined();
    expect(contato!.telefone_celular).toBe("999999999");
  });

  it("deve remover o contato do banco após o teste", async () => {
    const deletado = await contatoRepository.deleteContatoByName(testUser.name);
    expect(deletado).toBe(true);
  });
});
