//import Users from '../models/users';

import UsersRepository from '../repositories/UsersRepository';

// interface com os dados a serem requisitados para realização do serviço
interface IRequest {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

// Classe de criação de usuário:
// - Verifica se o usuário já existe pelo CPF e pelo e-mail, usando funções do repositório
// - Se não existir, cria o usuário pela função de criação do repositório
// - Retorna o usuário criado
class CreateUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(data: IRequest){
        const userWithCPF = this.usersRepository.findUserByCPF(data.cpf);
        if(userWithCPF){
            throw new Error('Já existe um usuário com esse CPF');
        };

        const userWithEmail = this.usersRepository.findUserByEmail(data.email);
        if(userWithEmail){
            throw new Error('Já existe um usuário com esse e-mail');
        }
        const user = this.usersRepository.create(data);

        return user;
    }
}
export default CreateUserService;