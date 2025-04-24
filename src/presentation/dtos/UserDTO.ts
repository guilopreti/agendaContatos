import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserDTO {
    
    @IsNotEmpty({message: "O nome é obrigatório!"})
    @Length(5, 70, {message: "O nome deve conter entre 5 e 70 caractéres"})
    name!: string;

    @IsEmail({}, {message: "O e-mail informado é inválido!"})
    @IsNotEmpty({message: "O e-email é um campo obrigatório!"})
    email!: string;

    constructor(_name: string, _email: string) {
        this.name = _name;
        this.email = _email;
    }
}