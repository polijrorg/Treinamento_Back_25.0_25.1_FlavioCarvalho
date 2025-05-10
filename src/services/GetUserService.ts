//import Users from '../models/users';

import UsersRepository from '../repositories/UsersRepository';

// interface com os dados a serem requisitados para o serviço
interface IRequest {
    id: string;
}

// Classe de obtenção de um usuário:
// - obtem o usuário pelo id a partir da função de busca do repositório
// - Se não existir, lança um erro

class GetUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(data: IRequest){
        const user = this.usersRepository.getById(data.id);

        if(!user){
            throw new Error('Esse usuário não existe');
        }
        return user;
    }
}
export default GetUserService;