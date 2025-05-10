//import Users from '../models/users';

import UsersRepository from '../repositories/UsersRepository';

//interface com os dados a serem requisitados para o serviço
interface IRequest {
    id: string;
}

// Classe de deleção de usuário:
// - Verifica se o usuário existe pelo id, usando funções do repositório
// - Se não existir, lança um erro
// - Obtem o index do usuario pelo id usando uma função do repositório
// - Deleta o usuário pela função de deleção do repositório usando seu index
class DeleteUserService {
    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public execute(data: IRequest){
        const userWithId = this.usersRepository.getById(data.id);

        if(!userWithId){
            throw new Error('Esse usuário não existe');
        }

        const index = this.usersRepository.findIndexById(data.id);

        this.usersRepository.delete(index);

        return userWithId;
    }
}
export default DeleteUserService;