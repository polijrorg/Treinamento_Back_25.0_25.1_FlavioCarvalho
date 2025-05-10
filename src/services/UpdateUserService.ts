//import Users from '../models/users';

import UsersRepository from '../repositories/UsersRepository';

//interface com os dados a serem requisitados para o serviço
interface IRequest {
    id: string;
    data: {
    name: string;
    email: string;
    }
}
// Classe de atualização de usuário:
// - Verifica se o usuário já existe pelo id e email, usando funções do repositório
// - Se não existir, lança um erro
// - Se existir, atualiza o usuário pela função de atualização do repositório
// - Retorna o usuário atualizado
class UpdateUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(data: IRequest){
        const userWithId = this.usersRepository.getById(data.id); 

        if(!userWithId){
            throw new Error('Esse usuário não existe');
        }

        const userWithEmail = this.usersRepository.findUserByEmail(data.data.email);

        if(userWithEmail){
            throw new Error('Já existe um usuário com esse e-mail');
        }

        const user = this.usersRepository.update(data);

        return user;
    }
}
export default UpdateUserService;